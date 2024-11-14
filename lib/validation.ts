import { type ValidationItem } from "jb-validation";
import { type JBInputValue } from "jb-input";
import {isStringIsNumber} from './utils';
export const isNumberValidator :ValidationItem<JBInputValue> = {
  validator:({value})=>{
    return isStringIsNumber(value);
  },
  message:"مقدار وارد شده میبایست عدد باشد"
};