# jb-number-input

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jb-number-input)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/javadbat/jb-number-input/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/jb-number-input)](https://www.npmjs.com/package/jb-number-input)
![GitHub Created At](https://img.shields.io/github/created-at/javadbat/jb-number-input)

`jb-number-input` is a number-focused extension of [`jb-input`](https://github.com/javadbat/jb-input). It keeps the JB Design System input UI while adding numeric standardization, number validation, keyboard stepping, optional control buttons, thousand separators, Persian digit display, and min/max/precision controls.

- Formats display values with thousand separators while keeping `.value` standardized.
- Supports Persian digits in user input and optional Persian digit display.
- Supports ArrowUp/ArrowDown increment and decrement with configurable `step`.
- Supports optional `+` and `-` control buttons.
- Supports negative-value blocking, min/max normalization, and decimal precision limits.
- Normalizes common incomplete values such as `100.00` to `100` and `50.` to `50` after commit.

## When to use

Use `jb-number-input` when the value is numeric and needs number-specific filtering, formatting, validation, or step controls.

Use [`jb-input`](https://github.com/javadbat/jb-input) for plain text. Use more specific inputs such as `jb-mobile-input`, `jb-date-input`, or `jb-payment-input` when the value has a specialized domain format.

## Demo

- [CodePen](https://codepen.io/javadbat/pen/gONgKRw)
- [Storybook](https://javadbat.github.io/design-system/?path=/docs/components-form-elements-inputs-jbnumberinput)

## Using With JS Frameworks

- [<img src="https://img.shields.io/badge/React.js-jb--number--input%2Freact-000.svg?logo=react&logoColor=%2361DAFB" height="30" />](https://github.com/javadbat/jb-number-input/tree/main/react)

## Installation

```sh
npm i jb-number-input
```

```js
import 'jb-number-input';
```

```html
<jb-number-input label="Amount" message="Enter amount"></jb-number-input>
```

### CDN

```html
<script src="https://unpkg.com/jb-input/dist/jb-input.umd.js"></script>
<script src="https://unpkg.com/jb-number-input/dist/jb-number-input.umd.js"></script>
```

## API reference

`jb-number-input` extends [`jb-input`](https://github.com/javadbat/jb-input). For shared attributes, properties, events, methods, slots, validation, form association, and CSS parts, see the [`jb-input` API](https://github.com/javadbat/jb-input#api-reference).

### Number attributes

| name | type | default | description |
| --- | --- | --- | --- |
| `min` | `number` | `null` | Minimum value used during non-input standardization. |
| `max` | `number` | `null` | Maximum value used during non-input standardization. |
| `step` | `number` | `1` | Amount added or removed by ArrowUp, ArrowDown, and control buttons. |
| `decimal-precision` | `number` | `null` | Maximum allowed decimal digits. `null` means no explicit precision limit. |
| `accept-negative` | `boolean` | `true` | Allows negative values when true. Empty attribute and `"true"` mean true; `"false"` means false. |
| `show-control-button` | `boolean` | `false` | Shows increment and decrement buttons in the end section. |
| `thousand-separator` | `boolean \| string` | `false` | Enables display separators. Empty attribute and `"true"` use `,`; a custom string is used as the separator; `"false"` disables it. |
| `show-persian-number` | `boolean` | locale based | Displays Persian digits while keeping `.value` in English digits. |

### Number properties

| name | type | default | description |
| --- | --- | --- | --- |
| `minValue` | `number \| null` | `null` | Minimum value used during non-input standardization. |
| `maxValue` | `number \| null` | `null` | Maximum value used during non-input standardization. |
| `step` | `number \| null` | `1` | Amount added or removed by ArrowUp, ArrowDown, and control buttons. |
| `decimalPrecision` | `number \| null` | `null` | Maximum allowed decimal digits. |
| `acceptNegative` | `boolean` | `true` | Allows negative values. |
| `showControlButton` | `boolean` | `false` | Shows or hides increment and decrement buttons. |
| `showThousandSeparator` | `boolean` | `false` | Enables or disables display separators. |
| `thousandSeparator` | `string` | `","` | Character used when `showThousandSeparator` is true. |
| `showPersianNumber` | `boolean` | locale based | Displays Persian digits while keeping `.value` standardized. |
| `invalidNumberReplacement` | `string` | `""` | Replacement text used when a pasted/programmatic value cannot be parsed as a number. |

### Number methods

| name | returns | description |
| --- | --- | --- |
| `increaseNumber(shouldCallOnChange?)` | `void` | Increases `.value` by `step`, validates, and optionally dispatches `change`. |
| `decreaseNumber(shouldCallOnChange?)` | `void` | Decreases `.value` by `step`, validates, and optionally dispatches `change`. |

## Value and display value

The component may show a formatted value while `.value` remains standardized.

```js
const input = document.querySelector('jb-number-input');

input.showThousandSeparator = true;
input.showPersianNumber = true;
input.value = '1234567';

console.log(input.value); // "1234567"
console.log(input.displayValue); // "۱,۲۳۴,۵۶۷"
```

## Configure number behavior

```js
const numberInput = document.querySelector('jb-number-input');

// Amount added or removed when the user presses the buttons or ArrowUp/ArrowDown. Default is 1.
numberInput.step = 100;
// Maximum number of decimal digits. Default is no explicit limit.
numberInput.decimalPrecision = 2;
// Replacement used when a pasted or programmatic value cannot be parsed. Default is an empty string.
numberInput.invalidNumberReplacement = '0';
// Show a separator every three integer digits, such as 1000000 => 1,000,000.
numberInput.showThousandSeparator = true;
// Character used for thousand separation.
numberInput.thousandSeparator = ',';
// Allow negative numbers.
numberInput.acceptNegative = false;
// Maximum value. Out-of-range values are normalized after commit or programmatic assignment.
numberInput.maxValue = 1000;
// Minimum value. Out-of-range values are normalized after commit or programmatic assignment.
numberInput.minValue = 1;
// Show Persian digits while keeping the submitted .value in English digits.
numberInput.showPersianNumber = false;
```

```html
<jb-number-input
  min="10"
  max="100"
  step="3"
  decimal-precision="2"
  show-control-button
  show-persian-number
  accept-negative="false"
  thousand-separator=","
></jb-number-input>
```

## Thousand separator

Use `thousand-separator` in one of these forms:

```html
<!-- Enables thousand separator with the default comma: 1,000,000 -->
<jb-number-input thousand-separator></jb-number-input>

<!-- Also enables the default comma separator -->
<jb-number-input thousand-separator="true"></jb-number-input>

<!-- Disables thousand separator -->
<jb-number-input thousand-separator="false"></jb-number-input>

<!-- Uses a custom separator: 1_000_000 -->
<jb-number-input thousand-separator="_"></jb-number-input>
```

## Control buttons

Set `showControlButton` or `show-control-button` to show `+` and `-` buttons. Button clicks call `increaseNumber(true)` or `decreaseNumber(true)`, so they dispatch `change`.

```html
<jb-number-input show-control-button step="10"></jb-number-input>
```

```js
const input = document.querySelector('jb-number-input');

input.showControlButton = true;
input.step = 10;
```

ArrowUp and ArrowDown also increase or decrease the value and dispatch `change`.

## Validation

`jb-number-input` adds a number validator to the inherited `jb-input` validation helper. Empty values are valid unless the inherited `required` validation is enabled.

```js
const input = document.querySelector('jb-number-input');

input.required = true;
input.validation.list = [
  {
    validator: ({ value }) => Number(value) % 2 === 0,
    message: 'Value must be even',
  },
];
```

## CSS variables

`jb-number-input` uses `jb-input` internally. [`jb-input` CSS variables and parts](https://github.com/javadbat/jb-input#css-parts-and-states) also apply.

| variable | description |
| --- | --- |
| `--jb-number-input-input-direction` | Direction of the inner input. The number input defaults to `ltr`. |
| `--jb-number-input-button-width` | Width of each control button. |
| `--jb-number-input-increase-button-bg` | Increase button background. |
| `--jb-number-input-decrease-button-bg` | Decrease button background. |
| `--jb-number-input-increase-button-border` | Increase button border. |
| `--jb-number-input-decrease-button-border` | Decrease button border. |
| `--jb-number-input-increase-button-border-radius` | Increase button border radius. |
| `--jb-number-input-decrease-button-border-radius` | Decrease button border radius. |
| `--jb-number-input-increase-button-color` | Increase icon color. |
| `--jb-number-input-decrease-button-color` | Decrease icon color. |
| `--jb-number-input-increase-button-color-hover` | Increase icon hover color. |
| `--jb-number-input-decrease-button-color-hover` | Decrease icon hover color. |

```css
jb-number-input {
  --jb-number-input-input-direction: ltr;
  --jb-number-input-button-width: 40px;
  --jb-number-input-increase-button-color: #047857;
  --jb-number-input-decrease-button-color: #b91c1c;
}
```

## Accessibility notes

- Shared label, message, validation, form association, focus, slots, and accessibility behavior come from `jb-input`.
- The inner native input uses `inputMode = "numeric"`.
- Form submission uses the standardized `.value`, not the formatted `displayValue`.

## Related Docs

- See [`jb-number-input/react`](https://github.com/javadbat/jb-number-input/tree/main/react) if you want to use this component in a React app.
- See [`jb-input`](https://github.com/javadbat/jb-input) for inherited API and styling.
- See [All JB Design System Component List](https://javadbat.github.io/design-system/) for more components.
- Use [Contribution Guide](https://github.com/javadbat/design-system/blob/main/docs/contribution-guide.md) if you want to contribute to this component.

## AI agent notes

- Import `jb-number-input` once before using `<jb-number-input>`.
- Do not set `type="number"`; the component keeps the inherited text input behavior and uses numeric filtering/standardization internally.
- Read `.value` for submitted/canonical value and `.displayValue` only for the rendered formatted value.
- Web attributes are `min`, `max`, `decimal-precision`, `accept-negative`, `show-control-button`, `thousand-separator`, and `show-persian-number`.
- JavaScript/React property names are `minValue`, `maxValue`, `decimalPrecision`, `acceptNegative`, `showControlButton`, `showThousandSeparator`, `thousandSeparator`, and `showPersianNumber`.
- Use `input` for every user edit and `change` for committed changes inherited from `jb-input`. Control button clicks dispatch `change`.
- This package includes [`custom-elements.json`](./custom-elements.json) and points to it with the package.json `customElements` field. The field is documented by the Custom Elements Manifest project in [Referencing manifests from npm packages](https://github.com/webcomponents/custom-elements-manifest#referencing-manifests-from-npm-packages).
- In `custom-elements.json`, `exports.kind: "js"` describes JavaScript/TypeScript exports and `exports.kind: "custom-element-definition"` maps the `jb-number-input` tag name to `JBNumberInputWebComponent`.
