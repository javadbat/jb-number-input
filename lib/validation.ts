import { type ValidationItem } from "jb-validation";
import { type JBInputValue } from "jb-input";
import {isStringIsNumber} from './utils';
export const isNumberValidator :ValidationItem<JBInputValue> = {
  validator:({value})=>{
    // we allow empty value as an valid number
    if(value.trim().length == 0){
      return true;
    }
    return isStringIsNumber(value);
  },
  message:"مقدار وارد شده میبایست عدد باشد"
};