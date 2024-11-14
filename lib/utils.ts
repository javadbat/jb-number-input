import { enToFaDigits, faToEnDigits } from "../../../common/scripts/persian-helper";
import { type JBInputValue} from "jb-input";
import { type TypeParameter, type NumberFieldParameter} from "./types";

export function standardValueForNumberInput(inputValueString:string, numberFieldParameters:NumberFieldParameter, typeParameter:TypeParameter):JBInputValue{
  if(inputValueString == '-' && numberFieldParameters!.acceptNegative == true){
    //if user type - and we accept negative number we let user to continue typing
    return {
      displayValue:inputValueString,
      value:'-0'
    };
  }
  let valueString = inputValueString;
  //if  comma separator is used we need to remove it
  if(typeParameter.useThousandSeparator){
    valueString = valueString.replace(new RegExp(`${typeParameter.thousandSeparator}`,'g'), '');
  }
  const isNegativeNumber = valueString.at(0) == '-';
  //remove all unrelated char from value
  valueString = faToEnDigits(valueString).replace(/[^0-9.]/g,'');
  if(isNegativeNumber && numberFieldParameters.acceptNegative){
    valueString = '-'+valueString;
  }
  //if our input type is number and user want to set it to new value we do necessary logic here
  let value = Number(valueString);
  if (isNaN(value)) {
    //replace arabic and persian number
    valueString = valueString.replace(/\u06F0/g, '0').replace(/\u06F1/g, '1').replace(/\u06F2/g, '2').replace(/\u06F3/g, '3').replace(/\u06F4/g, '4').replace(/\u06F5/g, '5').replace(/\u06F6/g, '6').replace(/\u06F7/g, '7').replace(/\u06F8/g, '8').replace(/\u06F9/g, '9');
    value = parseFloat(valueString);
    //if invalidity is not for persian number
    if(isNaN(value)){
      //we change nothing
      valueString = typeParameter.invalidNumberReplacement;
    }
  }
  //add max and min checker to prevent bigger value assignment
  if(numberFieldParameters.maxValue && value> numberFieldParameters.maxValue){
    value = numberFieldParameters.maxValue;
    valueString = `${numberFieldParameters.maxValue}`;
  }
  if(numberFieldParameters.minValue && value< numberFieldParameters.minValue){
    value = numberFieldParameters.minValue;
    valueString = `${numberFieldParameters.minValue}`;
  }
  const[integerNumbers, decimalNumbers] = valueString.split('.');
    
  const decimalPrecisionCount = decimalNumbers ? decimalNumbers.length : 0;
  if (numberFieldParameters && !(numberFieldParameters.decimalPrecision === null || numberFieldParameters.decimalPrecision == undefined) && decimalPrecisionCount && decimalPrecisionCount > numberFieldParameters.decimalPrecision) {
    // truncate extra decimal
    const checkRegex = new RegExp(`^-?\\d+(?:\\.\\d{0,${numberFieldParameters!.decimalPrecision}})?`);
    const match = valueString.match(checkRegex);
    if (match && match[0]) {
      valueString = match[0];
    }
  }
  //remove start zero when number is more than one digit 065 => 65
  if(integerNumbers.startsWith('0') && integerNumbers.length > 1){
    valueString = valueString.substring(1);
  }
  if( integerNumbers.startsWith('-') && integerNumbers.charAt(1) == '0' && integerNumbers.length > 2){
    valueString = '-'+valueString.substring(2);
  }
  const standardValueObject: JBInputValue = {
    displayValue: valueString,
    value: valueString,
  };
    // add thousand separator comma
  if(typeParameter.useThousandSeparator){
    standardValueObject.displayValue = valueString.replace(/\B(?=(\d{3})+(?!\d))/g, typeParameter.thousandSeparator);
  }
  //convert en number to persian number
  if(typeParameter.showPersianNumber){
    standardValueObject.displayValue = enToFaDigits(standardValueObject.displayValue);
  }
  return standardValueObject;
}

export function isStringIsNumber(value: string | null): boolean {
  if (value == null || value == undefined || value.trim().length == 0) {
    return false;
  } else {
    let isNumber = !isNaN(Number(value));
    if (!isNumber) {
      const replacedNumberValue = faToEnDigits(value);
      isNumber = !isNaN(Number(replacedNumberValue));
    }
    return isNumber;
  }
}