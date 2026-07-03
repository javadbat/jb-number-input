# jb-number-input React component

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jb-number-input)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/javadbat/jb-number-input/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/jb-number-input-react)](https://www.npmjs.com/package/jb-number-input-react)
![GitHub Created At](https://img.shields.io/github/created-at/javadbat/jb-number-input)

React wrapper for [`jb-number-input`](https://github.com/javadbat/jb-number-input). It imports and registers the underlying web component and reuses [`jb-input/react`](https://github.com/javadbat/jb-input-react) behavior for shared input props and events.

## Demo

- [CodeSandbox preview](https://3f63dj.csb.app/samples/jb-number-input)
- [CodeSandbox editor](https://codesandbox.io/p/sandbox/jb-design-system-3f63dj?file=%2Fsrc%2Fsamples%2FJBNumberInput.tsx)
- [StackBlitz](https://stackblitz.com/edit/jb-number-input-react?file=src%2FApp.tsx)
- [Storybook](https://javadbat.github.io/design-system/?path=/docs/components-form-elements-inputs-jbnumberinput)

## Installation

```sh
npm i jb-number-input
```

```jsx
import { JBNumberInput } from 'jb-number-input/react';

<JBNumberInput label="Amount" message="Enter amount" />;
```

## When to use

Use `JBNumberInput` when a React form value is numeric and needs number-specific filtering, formatting, validation, Persian digit display, thousand separators, or step controls.

Use `JBInput` for plain text and more specific inputs such as `JBMobileInput`, `JBDateInput`, or `JBPaymentInput` for specialized domain formats.

## Props

`JBNumberInput` accepts shared `jb-input/react` props such as `value`, `label`, `message`, `placeholder`, `disabled`, `required`, `validationList`, `onInput`, `onChange`, `onFocus`, `onBlur`, and keyboard events.

| prop | type | description |
| --- | --- | --- |
| `minValue` | `number` | Minimum value used during non-input standardization. |
| `maxValue` | `number` | Maximum value used during non-input standardization. |
| `step` | `number` | Amount added or removed by ArrowUp, ArrowDown, and control buttons. |
| `decimalPrecision` | `number` | Maximum allowed decimal digits. |
| `acceptNegative` | `boolean` | Allows negative values. |
| `showControlButton` | `boolean` | Shows increment and decrement buttons. |
| `showThousandSeparator` | `boolean` | Enables display separators. |
| `thousandSeparator` | `string` | Character used when `showThousandSeparator` is true. |
| `showPersianNumber` | `boolean` | Displays Persian digits while keeping `.value` in English digits. |

## Controlled value

```jsx
const [value, setValue] = useState('');

<JBNumberInput
  value={value}
  onChange={(event) => setValue(event.target.value)}
/>;
```

## Configure number behavior

```jsx
<JBNumberInput
  // Amount added or removed when the user presses the buttons or ArrowUp/ArrowDown. Default is 1.
  step={100}
  // Maximum number of decimal digits. Default is no explicit limit.
  decimalPrecision={2}
  // Show a separator every three integer digits, such as 1000000 => 1,000,000.
  showThousandSeparator
  // Character used for thousand separation.
  thousandSeparator=","
  // Allow negative numbers.
  acceptNegative={false}
  // Maximum value. Out-of-range values are normalized after commit or programmatic assignment.
  maxValue={1000}
  // Minimum value. Out-of-range values are normalized after commit or programmatic assignment.
  minValue={1}
  // Show Persian digits while keeping the submitted value in English digits.
  showPersianNumber={false}
/>;
```

## Control buttons

```jsx
<JBNumberInput showControlButton step={10} />;
```

Control button clicks and ArrowUp/ArrowDown update the value and dispatch `onChange`.

## Thousand separator

Use `showThousandSeparator` and `thousandSeparator` for display formatting. The submitted `event.target.value` remains the standardized English-digit value without separator characters.

## Validation

Use inherited `required`, `error`, and `validationList` props for validation. Use `minValue`, `maxValue`, and `decimalPrecision` for built-in numeric constraints.

## Styling

The React component uses the same CSS variables as the web component. For custom style options, see [`jb-number-input`](https://github.com/javadbat/jb-number-input) and inherited [`jb-input`](https://github.com/javadbat/jb-input) styling docs.

## CSS variables

Use the same CSS variables as the web component, plus inherited `jb-input` variables for the shared input shell.

## Accessibility notes

Set `label` for the field name. When `showControlButton` is enabled, keep the input enabled only when increment/decrement controls should be usable.

## Shared Documentation

For web-component behavior, events, slots, validation, and CSS variables, see [`jb-number-input`](https://github.com/javadbat/jb-number-input).

## Related Docs

- See [`jb-number-input`](https://github.com/javadbat/jb-number-input) if you want to use this component as a pure JavaScript web component.
- See [All JB Design System Component List](https://javadbat.github.io/design-system/) for more components.
- Use [Contribution Guide](https://github.com/javadbat/design-system/blob/main/docs/contribution-guide.md) if you want to contribute to this component.

## AI agent notes

- Import `JBNumberInput` from `jb-number-input/react`; the wrapper imports and registers the underlying `jb-number-input` web component.
- Use React prop names such as `minValue`, `maxValue`, `decimalPrecision`, `acceptNegative`, and `showControlButton`, not web attributes such as `min`, `max`, or `decimal-precision`.
- Use `event.target.value` for the standardized value. Formatted display text may differ when thousand separators or Persian digit display are enabled.
- Use `showControlButton` for `+` and `-` controls and set `disabled` separately if the input should not be editable.
