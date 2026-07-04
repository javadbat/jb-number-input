import { type ValidationItem } from "jb-validation";
import { type JBInputValue } from "jb-input";
import {isStringIsNumber} from './utils';
import { dictionary } from "./i18n";
import { i18n } from "jb-core/i18n";
export const isNumberValidator :ValidationItem<JBInputValue> = {
  validator:({value})=>{
    // we allow empty value as an valid number
    if(value.trim().length == 0){
      return true;
    }
    return isStringIsNumber(value);
  },
  message:dictionary.get(i18n,"numberValidation")
};