import { ValidationItem } from "jb-input";
import { JBInputValue } from "jb-input/types";
import {isStringIsNumber} from './utils';
export const isNumberValidator :ValidationItem<JBInputValue> = {
  validator:({value})=>{
    return isStringIsNumber(value);
  },
  message:"مقدار وارد شده میبایست عدد باشد"
};