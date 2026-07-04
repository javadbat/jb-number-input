import {JBDictionary} from 'jb-core/i18n';
export type JBNumberInputDictionary = {
  numberValidation:string,
}

/**
 * dictionary of jb number input. it's already loaded with persian and english lang but you can also extend it with you apps other language or replace already exist language 
 * @example 
 * ```js
 * import {dictionary} from 'jb-number-input'
 * dictionary.setLanguage("fr", {
 *  numberValidation: "message in french",
 * // other dictionary keys
 * });
 * ```
 */
export const dictionary = new JBDictionary<JBNumberInputDictionary>({
  "fa":{
    numberValidation:"مقدار وارد شده میبایست عدد باشد",
  },
  "en":{
    numberValidation:"Your entered value must be number",
  }
});