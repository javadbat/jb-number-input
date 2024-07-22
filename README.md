# jb-number-input

this is a superset component on [jb-input](https://github.com/javadbat/jb-input) , just for number input with extra filter and ready to use validator

## instructions

### install

#### using npm

1- install npm package
```cmd
npm i jb-number-input
```

2- import module in one of your js in page

```js
import 'jb-number-input';

```

3- use component in your html or jsx file like any other html tag

```html
<jb-number-input label="number:" message="subtitle of input box"></jb-number-input>
```
#### using cdn

1- add script tag to your html file.

```HTML
<script src="https://unpkg.com/jb-input/dist/jb-number-input.umd.js"></script>
<script src="https://unpkg.com/jb-number-input/dist/jb-number-input.umd.js"></script>
```
2- use web component like any other html tag whenever you need

```html
<div class="some-app-div">
  <jb-number-input label="number:" message="subtitle of input box"></jb-number-input>
</div>
```
### get/set value

```js
//get value
const inputValue = document.getElementByTagName('jb-number-input').value;
//set value
document.getElementByTagName('jb-number-input').value = "new string";
```
### Config Number parameters

if you want to control which number user may input, ex: you may want to let user input negative number or add min & max boundary or limit decimal precision. for doing so you can set number field parameter to jb-number-input.    

```javascript
    document.getElementByTagName('jb-number-input').setNumberFieldParameter({
        //how many number you want to + or  - on user press buttons or use arrow keys default is 1
        step:100,
        // how many decimal input accept default is infinity
        decimalPrecision:2,
        // what char replaced to input if user paste some illegal value default is '' (empty string)
        invalidNumberReplacement:'0',
        // separate every 3 number with comma like 1000000 => 1,000,000
        useThousandSeparator:false,
        // which char we use to separate thousand number
        thousandSeparator:',',
        //can input accept negative number or not
        acceptNegative:true,
        // max number value user can input. if user input bigger number it will be set to max
        maxValue: 1000,
        //min number value user can input. if user input smaller number it will be set to this value.
        minValue:1,
        // will show persian number instead of english number in output but original input value remain in english char
        //if true and user type 123 and see ۱۲۳ but inputtedDom.value will be 123
        showPersianNumber:false,
    })
```

<!-- ### add bank icons
for card number input you can add bank icon in the start or end of input (currently only support iran banks) so when user type first 6 digit of card number it will show bank logo.    
to make this happen you just have to import and add `bank-indicator` web component
```js
import 'jb-payment-input/dist/bank-indicator/bank-indicator.js';
```
### set custom style
| css variable name          | description                                      |
| -----------------          | -----------                                      |
| --bank-indicator-padding   | bank logo padding,the default value is `8px 16px`|
```html
 <jb-payment-input input-type="CARD_NUMBER" class="" label="card number:" message="with bank indicator">
   <bank-indicator slot="end-section"></bank-indicator>
 </jb-payment-input>
``` -->
click on `+` `-` button will call `onChange` event.
<!-- ### other attribute
you may use all [jb-input](https://github.com/javadbat/jb-input) attribute + below attributes

| atribute name  | description                                                                                    |
| -------------  | -------------                                                                                  |
| input-type     | `CARD` for 16 card number and `SHABA` to type shaba number input                               |
| separator      | separation char. default is ` `(space) but you can set any text you want like `-` or `_`       | -->


### set custom style

in some cases in your project you need to change default style of web-component for example you need zero margin or different border-radius and etc.    
if you want to set a custom style to this web-component all you need is to set css variable in parent scope of web-component.
since jb-payment-input use jb-input underneath, read [jb-input](https://github.com/javadbat/jb-input) custom style list.

#### control Buttons
you can add `+` and `-` button into your box element for easier access to change the number with just simple click or touch.
if you want to add this buttons you just have to set `showControlButton` of component:
```js
document.getElementByTagName('jb-number-input').showControlButton = true //or false
```
after that if user click on the `+` or `-` value will increase or decrease base on the step you set in `setNumberFieldParameter`(default is 1)
