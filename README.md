# jb-number-input

this is a superset component on [jb-input](https://github.com/javadbat/jb-input) , just for number input with extra filter and ready to use validator

Demo: [codepen](https://codepen.io/javadbat/pen/gONgKRw) 
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
  const numberInput = document.getElementByTagName('jb-number-input')

        //how many number you want to + or  - on user press buttons or use arrow keys default is 1
        numberInput.step=100,
        // how many decimal input accept default is infinity
        numberInput.decimalPrecision=2,
        // what char replaced to input if user paste some illegal value default is '' (empty string)
        numberInput.invalidNumberReplacement='0',
        // separate every 3 number with comma like 1000000 => 1,000,000
        numberInput.showThousandSeparator = false,
        // which char we use to separate thousand number
        numberInput.thousandSeparator =',',
        //can input accept negative number or not
        numberInput.acceptNegative=true,
        // max number value user can input. if user input bigger number it will be set to max
        numberInput.maxValue= 1000,
        //min number value user can input. if user input smaller number it will be set to this value.
        numberInput.minValue = 1,
        // will show persian number instead of english number in output but original input value remain in english char
        //if true and user type 123 and see ۱۲۳ but inputtedDom.value will be 123
        numberInput.showPersianNumber =false,
```

you can also set this values by html attributes:
```html
<jb-number-input 
  min="10"
  max="100"
  step="3"
  decimal-precision="2"
  show-persian-number
  accept-negative
  thousand-separator=","
  <!-- or -->
  thousand-separator
  <!-- or -->
  thousand-separator="true"
  <!-- or -->
  thousand-separator="false"

/>
```



### set custom style

in some cases in your project you need to change default style of web-component for example you need zero margin or different border-radius and etc.    
if you want to set a custom style to this web-component all you need is to set css variable in parent scope of web-component.
since jb-payment-input use jb-input underneath, read [jb-input](https://github.com/javadbat/jb-input) custom style list.

| variable                                       | description |
|------------------------------------------------|-------------|
| --jb-number-input-input-direction              | number input is ltr by default even in rtl page.so you should override it by this variable if you want it rtl or inherit |
| --jb-number-input-button-width                 | |
| --jb-number-input-increase-button-bg           | |
| --jb-number-input-decrease-button-bg           | |
| --jb-number-input-increase-button-border       | |
| --jb-number-input-decrease-button-border       | |
| --jb-number-input-increase-button-border-radius| |
| --jb-number-input-decrease-button-border-radius| |
| --jb-number-input-increase-button-color        | |
| --jb-number-input-decrease-button-color        | |
| --jb-number-input-increase-button-color-hover  | |
| --jb-number-input-decrease-button-color-hover  | |

### control Buttons
you can add `+` and `-` button into your box element for easier access to change the number with just simple click or touch.
if you want to add this buttons you just have to set `showControlButton` of component:

```js
document.getElementByTagName('jb-number-input').showControlButton = true //or false
```
or you can set `show-control-button` attribute 
```html
<jb-number-input show-control-button>
<jb-number-input show-control-button="true">
<jb-number-input show-control-button="false">
```
after that if user click on the `+` or `-` value will increase or decrease base on the step you set in `step` attribute(default is 1).    
click on `+` `-` button will call `onChange` event.