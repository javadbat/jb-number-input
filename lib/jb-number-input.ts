import CSS from "./jb-number-input.css";
import VariablesCSS from "./variables.css";
import "jb-input";
import { type NumberFieldParameter, type NumberInputElements } from './types.js';
// eslint-disable-next-line no-duplicate-imports
import { JBInputWebComponent, ValueSetterEventType, type JBInputValue } from "jb-input";
//TODO: update it when you move validation to core package
import { type ValidationItem } from "jb-validation";
import { isNumberValidator } from "./validation";
import { isStringIsNumber, standardValueForNumberInput } from "./utils.js";
import { renderButtonsHTML } from "./render";
import { i18n } from "jb-core/i18n";

export * from "./types.js";

//TODO: add barcode scanner or nfc reader
export class JBNumberInputWebComponent extends JBInputWebComponent {
  #numberFieldParameters: NumberFieldParameter = {
    //if input type is number we use this step to change value on +- clicks
    maxValue: null,
    minValue: null,
    //how many decimal  place we accept
    decimalPrecision: null,
    acceptNegative: true,
  };
  //
  get minValue() {
    return this.#numberFieldParameters.minValue;
  }
  set minValue(value: number | string) {
    if (value === undefined || value === null) {
      this.#numberFieldParameters.minValue = null;
      return;
    }
    const newValue = Number(value);
    if (Number.isNaN(newValue)) {
      console.error("min value is not a valid number");
      return;
    }
    this.#numberFieldParameters.minValue = newValue;
  }
  //
  get maxValue() {
    return this.#numberFieldParameters.maxValue;
  }
  set maxValue(value: number | string) {
    if (value === undefined || value === null) {
      this.#numberFieldParameters.maxValue = null;
      return;
    }
    const newValue = Number(value);
    if (Number.isNaN(newValue)) {
      console.error("max value is not a valid number");
      return;
    }
    this.#numberFieldParameters.maxValue = newValue;
  }
  //
  get decimalPrecision() {
    return this.#numberFieldParameters.decimalPrecision;
  }
  set decimalPrecision(value: number | string) {
    if (value === undefined || value === null) {
      this.#numberFieldParameters.decimalPrecision = null;
      return;
    }
    const newValue = Number(value);
    if (Number.isNaN(newValue)) {
      console.error("decimalPrecision value is not a valid number");
      return;
    }
    this.#numberFieldParameters.decimalPrecision = newValue;
  }
  //
  get acceptNegative() {
    return this.#numberFieldParameters.acceptNegative;
  }
  set acceptNegative(value: boolean) {

    this.#numberFieldParameters.acceptNegative = Boolean(value);
  }
  //how many step number increase or decrease on + , - or arrow up , arrow down
  #step = 1;
  get step() {
    return this.#step;
  }
  set step(value: number) {
    if (value === undefined || value === null) {
      this.#step = null;
      return;
    }
    if (Number.isNaN(Number(value))) {
      console.error("step must be a number");
      return;
    }
    this.#step = value;
  }
  //for money and big number separate with a comma
  #showThousandSeparator = false;
  get showThousandSeparator() {
    return this.#showThousandSeparator;
  }
  set showThousandSeparator(value: boolean) {
    const newValue = Boolean(value);
    if (newValue === this.#showThousandSeparator) {
      return;
    }
    this.#showThousandSeparator = newValue;
    this.value = `${this.value}`;
  }
  #thousandSeparator = ","
  get thousandSeparator() {
    return this.#thousandSeparator;
  }
  set thousandSeparator(value: string) {
    if (this.#thousandSeparator === value) {
      return;
    }
    this.#thousandSeparator = String(value);
    this.value = `${this.value}`;
  }
  //will show persian number even if user type en number but value will be passed as en number
  #showPersianNumber = i18n.locale.numberingSystem == "arabext";
  get showPersianNumber() {
    return this.#showPersianNumber;
  }
  set showPersianNumber(value: boolean) {
    this.#showPersianNumber = Boolean(value);
    this.value = `${this.value}`;
  }
  //if user type or paste something not a number, this char will be filled the replacement in most cases will be '0'
  #invalidNumberReplacement = "";
  get invalidNumberReplacement() {
    return this.#invalidNumberReplacement;
  }
  set invalidNumberReplacement(value: string) {
    this.#invalidNumberReplacement = String(value);
  }
  numberInputElements!: NumberInputElements;
  #showControlButton = false;
  get showControlButton() {
    return this.#showControlButton;
  }
  set showControlButton(value: boolean) {
    if (value == this.#showControlButton) {
      //nothing changes 
      return;
    }
    this.#showControlButton = value;
    if (value === true) {
      this.#addControlButtons();
    } else if (value === false) {
      this.#removeControlButtons();
    }
  }
  constructor() {
    super();
    this.#initNumberInputWebComponent();
  }
  #addNumberInputEventListeners() {
    this.elements.input.addEventListener("beforeinput", this.#onNumberInputBeforeInput.bind(this));
    this.addEventListener("keydown", this.#onNumberInputKeyDown.bind(this));
  }
  #initNumberInputWebComponent() {
    const html = `<style>${CSS} ${VariablesCSS}</style>`;
    const element = document.createElement("template");
    element.innerHTML = html;
    this.shadowRoot.appendChild(element.content.cloneNode(true));
    this.validation.addValidationListGetter(this.#getNumberInputValidations.bind(this));
    this.elements.input.inputMode = "numeric";
    this.numberInputElements = {
      controlButtons: null
    };
    this.#addNumberInputEventListeners();
    this.addStandardValueCallback(this.#standardNumberValue.bind(this));
  }
  static get numberInputObservedAttributes() {
    return ["thousand-separator", "step", "show-persian-number", "min", "max", "decimal-precision", "accept-negative", "show-control-button"];
  }
  static get observedAttributes() {
    return [
      ...JBInputWebComponent.observedAttributes,
      ...JBNumberInputWebComponent.numberInputObservedAttributes
    ];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    // call base jb-input on attribute changes
    if ([...JBNumberInputWebComponent.numberInputObservedAttributes, 'type'].includes(name)) {
      this.#onNumberInputAttributeChange(name, newValue);
    } else {
      this.onAttributeChange(name, newValue);
    }
  }
  #standardNumberValue(valueString: string, oldValue:JBInputValue, prevResult:JBInputValue, eventType:ValueSetterEventType ): JBInputValue {
    return standardValueForNumberInput(
      valueString,
      this.#numberFieldParameters,
      {
        invalidNumberReplacement: this.#invalidNumberReplacement,
        thousandSeparator: this.#thousandSeparator,
        useThousandSeparator: this.showThousandSeparator,
        showPersianNumber: this.#showPersianNumber
      },
      eventType
    );
  }
  #onNumberInputAttributeChange(name: string, value: string) {
    switch (name) {
      case 'thousand-separator':
        if (value == '' || value == "true" || value == "false") {

          this.showThousandSeparator = value == '' ? true : value === 'true';
        } else {
          this.#showThousandSeparator = true;
          this.#thousandSeparator = value;
        }
        break;
      case 'step':
        this.step = Number(value);
        break;
      case "show-persian-number":
        this.showPersianNumber = value == '' ? true : value === 'true';
        break;
      case 'min':
        this.minValue = value;
        break;
      case 'max':
        this.maxValue = value;
        break;
      case "decimal-precision":
        this.decimalPrecision = value;
        break;
      case "accept-negative":
        if (value == '' || value == "true" || value == "false") {
          this.acceptNegative = value == '' ? true : value === 'true';
        }
        break;
      case "show-control-button":
        if (value == '' || value == "true" || value == "false") {
          this.showControlButton = value == '' ? true : value === 'true';
        }
        break;
      case 'type':
        //we do nothing but just prevent input to get number type because of some limitation
        //TODO: change inputmode base on provided type if it doesn't provided by user
        break;

    }
  }
  #getNumberInputValidations(): ValidationItem<JBInputValue>[] {
    return [isNumberValidator];
  }
  #dispatchOnChangeEvent() {
    const eventInit: EventInit = {
      //TODO: make it cancelable  like jb-input does
      cancelable: false,
    };
    const event = new Event("change", eventInit);
    this.dispatchEvent(event);
  }
  #addFloatNumber(num1: number, num2: number) {
    const prec1 = `${num1}`.split(".")[1];
    const prec2 = `${num2}`.split(".")[1];
    const zarib1 = prec1 ? Math.pow(10, prec1.length + 1) : 1;
    const zarib2 = prec2 ? Math.pow(10, prec2.length + 1) : 1;
    const zarib = Math.max(zarib1, zarib2);
    const stNum1 = num1 * zarib;
    const stNum2 = num2 * zarib;
    const res = stNum1 + stNum2;
    return res / zarib;
  }
  increaseNumber(shouldCallOnChange = false) {
    const currentNumber = Number(this.value);
    if (isNaN(currentNumber)) {
      return;
    }
    const step = this.#step;
    const newNumber = this.#addFloatNumber(currentNumber, step);
    this.value = `${newNumber}`;
    this.validation.checkValidity({ showError: true });
    if (shouldCallOnChange) {
      this.#dispatchOnChangeEvent();
    }
  }
  decreaseNumber(shouldCallOnChange = false) {
    const currentNumber = parseFloat(this.value);
    if (isNaN(currentNumber)) {
      return;
    }
    const step = this.#numberFieldParameters
      ? this.#step
      : 1;
    let newNumber = this.#addFloatNumber(currentNumber, -1 * step);
    if (
      newNumber < 0 &&
      !(
        this.#numberFieldParameters &&
        this.#numberFieldParameters.acceptNegative
      )
    ) {
      newNumber = 0;
    }
    this.value = `${newNumber}`;
    this.validation.checkValidity({ showError: true });
    if (shouldCallOnChange) {
      this.#dispatchOnChangeEvent();
    }
  }
  #addControlButtons() {
    const buttonsElement = document.createElement("div");
    buttonsElement.classList.add("number-control-wrapper");
    buttonsElement.innerHTML = renderButtonsHTML();
    buttonsElement
      .querySelector(".increase-number-button")!
      .addEventListener("click", this.increaseNumber.bind(this, true));
    buttonsElement
      .querySelector(".decrease-number-button")!
      .addEventListener("click", this.decreaseNumber.bind(this, true));
    this.elements.slots.endSection.appendChild(buttonsElement);
    this.numberInputElements.controlButtons = buttonsElement;
  }
  #removeControlButtons() {
    if (this.numberInputElements.controlButtons) {
      this.numberInputElements.controlButtons.remove();
    }
  }
  #onNumberInputKeyDown(e: KeyboardEvent): void {
    //handle up and down on number key
    const key = e.key;
    if (key == "ArrowUp") {
      this.increaseNumber(false);
      e.preventDefault();
    }
    if (key == "ArrowDown") {
      this.decreaseNumber(false);
      e.preventDefault();
    }

  }
  #onNumberInputBeforeInput(e: InputEvent): void {
    //TODO: read and simplify
    const endCaretPos = (e.target as HTMLInputElement).selectionEnd || 0;
    const startCaretPos = (e.target as HTMLInputElement).selectionStart || 0;
    let isPreventDefault = false;
    // we check number input type field and prevent non number values
    if (e.inputType !== "deleteContentBackward" && !isStringIsNumber(e.data)) {
      isPreventDefault = true;
      // we made exception for . char if its valid by user
      if (
        e.data == "." &&
        this.#numberFieldParameters!.decimalPrecision !== 0 &&
        this.value.indexOf(".") == -1 &&
        !(endCaretPos == 0 || startCaretPos == 0) &&
        !(
          this.#numberFieldParameters!.decimalPrecision !== null &&
          this.value.substring(endCaretPos).length >
          this.#numberFieldParameters!.decimalPrecision
        )
      ) {
        isPreventDefault = false;
      }
      //for '-' char we check if negative number is allowed
      if (this.#numberFieldParameters.acceptNegative && e.data[0] == "-" && (startCaretPos == 0)
      ) {
        isPreventDefault = false;
      }
    }
    if (isPreventDefault) {
      e.preventDefault();
    }
  }
}

const myElementNotExists = !customElements.get("jb-number-input");
if (myElementNotExists) {
  window.customElements.define("jb-number-input", JBNumberInputWebComponent);
}