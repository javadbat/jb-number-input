import CSS from "./jb-number-input.scss";
import NumberInputButtonsHTML from "./number-input-buttons.html";
import "jb-input";
import { NumberFieldParameter, NumberFieldParameterInput } from './types';
// eslint-disable-next-line no-duplicate-imports
import { JBInputWebComponent } from "jb-input";
import { JBInputValue, ValidationValue } from "jb-input/types";
//TODO: update it when you move validation to core package
import { type WithValidation, type ValidationItem } from "jb-input/types/validation";
import { isNumberValidator } from "./validation";
import { isStringIsNumber, standardValueForNumberInput } from "./utils";
//TODO: add barcode scanner or nfc reader
export class JBNumberInputWebComponent extends JBInputWebComponent implements WithValidation<ValidationValue> {
  #numberFieldParameters: NumberFieldParameter = {
    //if input type is number we use this step to change value on +- clicks
    step: 1,
    maxValue: null,
    minValue: null,
    //how many decimal  place we accept
    decimalPrecision: null,
    //if user type or paste something not a number, this char will be filled the replacement in most cases will be '0'
    invalidNumberReplacement: "",
    //for money and big number separate with a comma
    useThousandSeparator: false,
    thousandSeparator: ",",
    acceptNegative: true,
    showButtons: true,
    //will show persian number even if user type en number but value will be passed as en number
    showPersianNumber: false,
  };
  constructor() {
    super();
    this.#initNumberInputWebComponent();
  }
  #addPaymentInputEventListeners() {
    this.addEventListener("beforeinput", this.#onNumberInputBeforeInput.bind(this));
    this.addEventListener("keydown", this.#onInputKeyDown.bind(this));
  }
  #initNumberInputWebComponent() {
    const html = `<style>${CSS}</style>`;
    const element = document.createElement("template");
    element.innerHTML = html;
    this.shadowRoot.appendChild(element.content.cloneNode(true));
    this.validation.addValidationListGetter(this.#getNumberInputValidations.bind(this));
    this.#addPaymentInputEventListeners();
    this.addStandardValueCallback(this.#standardNumberValue.bind(this));
  }
  static get observedAttributes() {
    return [
      ...JBInputWebComponent.observedAttributes,
    ];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    // call base jb-input on attribute changes
    if (["input-type", "separator"].includes(name)) {
      this.#onNumberInputAttributeChange(name, newValue);
    } else {
      this.onAttributeChange(name, newValue);
    }
  }
  #standardNumberValue(valueString: string): JBInputValue {
    const standardValue = this.#getNumberValueString(valueString);
    return standardValue;
  }
  #onNumberInputAttributeChange(name: string, value: string) {
    //TODO: get number field parameters as a attribute
    // switch(name){
    //   case 'separator':
    //     this.separatorString = value;
    //     break;
    // }
  }
  #getNumberValueString(rawText: string){
    return standardValueForNumberInput(
      rawText,
      this.#numberFieldParameters
    );
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
  increaseNumber() {
    const currentNumber = parseFloat(this.value);
    if (isNaN(currentNumber)) {
      return;
    }
    const step = this.#numberFieldParameters ? this.#numberFieldParameters.step : 1;
    const newNumber = this.#addFloatNumber(currentNumber, step);
    this.value = `${newNumber}`;
    this.validation.checkValidity(true);
    this.#dispatchOnChangeEvent();
  }
  decreaseNumber() {
    const currentNumber = parseFloat(this.value);
    if (isNaN(currentNumber)) {
      return;
    }
    const step = this.#numberFieldParameters
      ? this.#numberFieldParameters.step
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
    this.validation.checkValidity(true);
    this.#dispatchOnChangeEvent();
  }
  #addControlButtons() {
    //TODO: we dont need it anymore after separation you can delete this and refactor style
    this.elements.inputBox.classList.add("--type-number");
    const buttonsElement = document.createElement("div");
    buttonsElement.classList.add("number-control-wrapper");
    buttonsElement.innerHTML = NumberInputButtonsHTML;
    buttonsElement
      .querySelector(".increase-number-button")!
      .addEventListener("click", this.increaseNumber.bind(this));
    buttonsElement
      .querySelector(".decrease-number-button")!
      .addEventListener("click", this.decreaseNumber.bind(this));
    this.elements.inputBox.appendChild(buttonsElement);
  }
  /**
   * @description add + & - control button on the text field
   */
  addControlButtons() {
    this.#addControlButtons();
  }
  #onInputKeyDown(e: KeyboardEvent): void {
    //handle up and down on number key
    if (this.getAttribute("type") == "number") {
      const key = e.key;
      if (key == "ArrowUp") {
        this.increaseNumber!();
        e.preventDefault();
      }
      if (key == "ArrowDown") {
        this.decreaseNumber!();
        e.preventDefault();
      }
    }
  }
  /**
 * @public
 * @description change number input config base on developer need
 */
  setNumberFieldParameter(
    numberFieldParameters: NumberFieldParameterInput
  ): void {
    if (numberFieldParameters.step && !isNaN(numberFieldParameters.step)) {
      this.#numberFieldParameters!.step = numberFieldParameters.step;
    }
    if (
      numberFieldParameters &&
      numberFieldParameters.decimalPrecision !== null &&
      numberFieldParameters.decimalPrecision !== undefined &&
      !isNaN(numberFieldParameters.decimalPrecision)
    ) {
      this.#numberFieldParameters!.decimalPrecision =
        numberFieldParameters.decimalPrecision;
    }
    if (
      numberFieldParameters &&
      numberFieldParameters.invalidNumberReplacement
    ) {
      this.#numberFieldParameters!.invalidNumberReplacement =
        numberFieldParameters.invalidNumberReplacement;
    }
    if (
      numberFieldParameters &&
      typeof numberFieldParameters.useThousandSeparator == "boolean"
    ) {
      this.#numberFieldParameters!.useThousandSeparator =
        numberFieldParameters.useThousandSeparator;
    }
    if (
      numberFieldParameters &&
      typeof numberFieldParameters.thousandSeparator == "string"
    ) {
      this.#numberFieldParameters!.thousandSeparator =
        numberFieldParameters.thousandSeparator;
    }
    if (
      numberFieldParameters &&
      typeof numberFieldParameters.acceptNegative == "boolean"
    ) {
      this.#numberFieldParameters!.acceptNegative =
        numberFieldParameters.acceptNegative;
    }
    if (
      numberFieldParameters &&
      typeof numberFieldParameters.maxValue == "number"
    ) {
      this.#numberFieldParameters.maxValue = numberFieldParameters.maxValue;
    }
    if (
      numberFieldParameters &&
      typeof numberFieldParameters.minValue == "number"
    ) {
      this.#numberFieldParameters.minValue = numberFieldParameters.minValue;
    }
    if (
      numberFieldParameters &&
      numberFieldParameters.showButtons !== undefined
    ) {
      if (numberFieldParameters.showButtons === false) {
        this.removeNumberInputButtons();
      } else {
        this.addNumberInputButtons();
      }
    }
    if (
      numberFieldParameters &&
      typeof numberFieldParameters.showPersianNumber == "boolean"
    ) {
      this.#numberFieldParameters.showPersianNumber =
        numberFieldParameters.showPersianNumber;
    }
    this.value = `${this.value}`;
  }
  #onNumberInputBeforeInput(e: InputEvent): void {
    //TODO: read and simplify
    const endCaretPos = (e.target as HTMLInputElement).selectionEnd || 0;
    const startCaretPos = (e.target as HTMLInputElement).selectionStart || 0;
    let isPreventDefault = false;
    // we check number input type field and prevent non number values
    if (this.getAttribute("type") == "number" &&
      e.inputType !== "deleteContentBackward" && !isStringIsNumber(e.data)) {
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
      if (
        this.#numberFieldParameters &&
        this.#numberFieldParameters.acceptNegative &&
        e.data == "-" &&
        (startCaretPos == 0 || endCaretPos == 0)
      ) {
        isPreventDefault = false;
      }
    }
    if (isPreventDefault) {
      e.preventDefault();
    }
  }
  removeNumberInputButtons() {
    //when user want number input but without any + - button
    this.elements.inputBox.classList.add("--without-number-button");
  }
  addNumberInputButtons() {
    //when user want number input but without any + - button
    this.elements.inputBox.classList.remove("--without-number-button");
  }
}

const myElementNotExists = !customElements.get("jb-number-input");
if (myElementNotExists) {
  window.customElements.define("jb-number-input", JBNumberInputWebComponent);
}