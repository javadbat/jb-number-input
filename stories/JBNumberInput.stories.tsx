import React from 'react';
import { JBNumberInput } from 'jb-number-input/react';
import type { JBNumberInputWebComponent } from 'jb-number-input';
import { JBButton } from 'jb-button/react';
import JBInputNumberTest from './samples/JBInputNumberTest';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor } from 'storybook/test';
import {
  getDecreaseButton,
  getIncreaseButton,
  getNativeInput,
  getNumberInput,
} from './test-utils';

const meta = {
  title: "Components/form elements/Inputs/JBNumberInput",
  component: JBNumberInput,
} satisfies Meta<typeof JBNumberInput>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    label: 'label',
    message: 'static text under input show all the time',
    placeholder: 'place holder',
    disabled: false,
    onChange: (e) => { console.log(`new number is ${e.target.value}`); }
  },
  play: async ({ canvasElement }) => {
    const numberInput = getNumberInput(canvasElement);
    const nativeInput = getNativeInput(numberInput);

    await userEvent.type(nativeInput, 'abc12.3x4');

    await waitFor(() => {
      expect(numberInput.value).toBe('12.34');
      expect(numberInput.valueAsNumber).toBe(12.34);
      expect(numberInput.displayValue).toBe('12.34');
      expect(nativeInput.value).toBe('12.34');
      expect(numberInput.reportValidity()).toBe(true);
    });

    numberInput.value = '45text67';

    await waitFor(() => {
      expect(numberInput.value).toBe('4567');
      expect(numberInput.valueAsNumber).toBe(4567);
      expect(nativeInput.value).toBe('4567');
    });
  }
};

export const InitialValue: Story = {
  render: (args) => {
    const formRef = React.useRef<HTMLFormElement>(null);
    return (
      <form ref={formRef}>
        <JBNumberInput {...args} />
        <JBButton onClick={() => formRef.current?.reset()}>Reset</JBButton>
      </form>
    );
  },
  args: {
    label: 'initial value',
    initialValue: 1200,
    showThousandSeparator: true,
  },
  play: async ({ canvasElement, args }) => {
    const numberInput = getNumberInput(canvasElement);
    const nativeInput = getNativeInput(numberInput);
    const resetButton = canvasElement.querySelector('jb-button')?.shadowRoot?.querySelector<HTMLButtonElement>('button');

    expect(resetButton).toBeTruthy();

    await waitFor(() => {
      expect(numberInput.initialValue).toBe(String(args.initialValue));
      expect(numberInput.value).toBe('1200');
      expect(numberInput.displayValue).toBe('1,200');
      expect(nativeInput.value).toBe('1,200');
      expect(numberInput.isDirty).toBe(false);
    });

    numberInput.thousandSeparator = '_';
    numberInput.showPersianNumber = true;

    await waitFor(() => {
      // Presentation-only configuration must reformat both the live display
      // and baseline domain without consuming the initialization latch.
      expect(numberInput.initialValue).toBe('1200');
      expect(numberInput.value).toBe('1200');
      expect(numberInput.displayValue).toBe('۱_۲۰۰');
      expect(nativeInput.value).toBe('۱_۲۰۰');
      expect(numberInput.isDirty).toBe(false);
    });

    // Formatting configuration must not consume the initialization latch.
    numberInput.initialValue = '2,300';

    await waitFor(() => {
      expect(numberInput.initialValue).toBe('2300');
      expect(numberInput.value).toBe('2300');
      expect(numberInput.displayValue).toBe('۲_۳۰۰');
      expect(numberInput.isDirty).toBe(false);
    });

    // Use the public setter here because this story targets live-value
    // precedence; keyboard behavior is covered by the other number stories.
    numberInput.value = '2500';

    await waitFor(() => {
      expect(numberInput.value).toBe('2500');
      expect(numberInput.displayValue).toBe('۲_۵۰۰');
      expect(numberInput.isDirty).toBe(true);
    });

    numberInput.initialValue = '3000';

    await waitFor(() => {
      expect(numberInput.initialValue).toBe('3000');
      expect(numberInput.value).toBe('2500');
      expect(nativeInput.value).toBe('۲_۵۰۰');
      expect(numberInput.isDirty).toBe(true);
    });

    await userEvent.click(resetButton!);

    await waitFor(() => {
      expect(numberInput.value).toBe('3000');
      expect(numberInput.initialValue).toBe(numberInput.value);
      expect(numberInput.displayValue).toBe('۳_۰۰۰');
      expect(nativeInput.value).toBe('۳_۰۰۰');
      expect(numberInput.isDirty).toBe(false);
    });
  },
};

export const InitialValueDoesNotOverrideValue: Story = {
  args: {
    initialValue: 1200,
    value: 2500,
    showThousandSeparator: true,
  },
  play: async ({ canvasElement }) => {
    const numberInput = getNumberInput(canvasElement);
    const nativeInput = getNativeInput(numberInput);

    await waitFor(() => {
      expect(numberInput.initialValue).toBe('1200');
      expect(numberInput.value).toBe('2500');
      expect(numberInput.displayValue).toBe('2,500');
      expect(nativeInput.value).toBe('2,500');
      expect(numberInput.isDirty).toBe(true);
    });
  },
};

export const ExplicitNullValueDoesNotFallBackToInitialValue: Story = {
  args: {
    initialValue: 1200,
    value: null,
    showThousandSeparator: true,
  },
  play: async ({ canvasElement }) => {
    const numberInput = getNumberInput(canvasElement);
    const nativeInput = getNativeInput(numberInput);

    await waitFor(() => {
      expect(numberInput.initialValue).toBe('1200');
      expect(numberInput.value).toBe('');
      expect(numberInput.displayValue).toBe('');
      expect(nativeInput.value).toBe('');
      expect(numberInput.isDirty).toBe(true);
    });
  },
};

export const NumberWithComma: Story = {
  args: {
    label: 'with thousand separator',
    message: 'type a big number. each 3 number will separated by a comma',
    showThousandSeparator: true,
    onChange: (e) => { console.log(`new number is ${e.target.value}`); }
  },
  play: async ({ canvasElement }) => {
    const numberInput = getNumberInput(canvasElement);
    const nativeInput = getNativeInput(numberInput);

    await userEvent.type(nativeInput, '1234567');

    await waitFor(() => {
      expect(numberInput.value).toBe('1234567');
      expect(numberInput.displayValue).toBe('1,234,567');
      expect(nativeInput.value).toBe('1,234,567');
    });

    numberInput.value = '-1234567.89';

    await waitFor(() => {
      expect(numberInput.value).toBe('-1234567.89');
      expect(nativeInput.value).toBe('-1,234,567.89');
    });
  }
};

export const NumberWithMinMax: Story = {
  args: {
    label: 'with min 100 & max 1000',
    message: 'type smaller or larger number, after un-focus it will turn to max or min(it does not prevent user from typing)',
    maxValue: 10000,
    minValue: 100,
    onChange: (e) => { console.log(`new number is ${e.target.value}`); }
  },
  play: async ({ canvasElement, args }) => {
    const numberInput = getNumberInput(canvasElement);
    const nativeInput = getNativeInput(numberInput);

    numberInput.value = '10';

    await waitFor(() => {
      expect(numberInput.value).toBe(`${args.minValue}`);
      expect(nativeInput.value).toBe(`${args.minValue}`);
    });

    numberInput.value = '12000';

    await waitFor(() => {
      expect(numberInput.value).toBe(`${args.maxValue}`);
      expect(nativeInput.value).toBe(`${args.maxValue}`);
    });

    numberInput.value = '500';

    await waitFor(() => {
      expect(numberInput.value).toBe('500');
      expect(numberInput.reportValidity()).toBe(true);
    });
  }
};

export const PrecisionAndInvalidReplacement: Story = {
  args: {
    label: 'precision and invalid replacement',
    decimalPrecision: 2,
  },
  play: async ({ canvasElement }) => {
    const numberInput = getNumberInput(canvasElement);
    const nativeInput = getNativeInput(numberInput);
    numberInput.invalidNumberReplacement = '0';

    numberInput.value = '12.345';

    await waitFor(() => {
      expect(numberInput.value).toBe('12.34');
      expect(nativeInput.value).toBe('12.34');
    });

    numberInput.value = '.';

    await waitFor(() => {
      expect(numberInput.value).toBe('0');
      expect(nativeInput.value).toBe('0');
    });
  },
};

export const NonNegativeNumberWithUnderlineSeparator: Story = {
  args: {
    label: 'non-negative number with underline separator',
    message: 'each 3 digit separated by _',
    acceptNegative: false,
    showThousandSeparator: true,
    thousandSeparator: '_',
    onChange: (e) => { console.log(`new number is ${e.target.value}`); }
  },
  play: async ({ canvasElement }) => {
    const numberInput = getNumberInput(canvasElement);
    const nativeInput = getNativeInput(numberInput);

    await userEvent.type(nativeInput, '-1234567');

    await waitFor(() => {
      expect(numberInput.value).toBe('1234567');
      expect(nativeInput.value).toBe('1_234_567');
    });

    await userEvent.keyboard('{ArrowDown}');

    await waitFor(() => {
      expect(numberInput.value).toBe('1234566');
      expect(nativeInput.value).toBe('1_234_566');
    });

    numberInput.value = '0';
    nativeInput.focus();
    await userEvent.keyboard('{ArrowDown}');

    await waitFor(() => {
      expect(numberInput.value).toBe('0');
      expect(nativeInput.value).toBe('0');
    });

    await userEvent.keyboard('{ArrowUp}');

    await waitFor(() => {
      expect(numberInput.value).toBe('1');
    });
  }
};
export const NumberWithButtons: Story = {
  args: {
    label: 'with increase and decrease button',
    message: 'with +- buttons',
    showControlButton: true,
    step: 100,
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const numberInput = getNumberInput(canvasElement);
    const nativeInput = getNativeInput(numberInput);
    const increaseButton = getIncreaseButton(numberInput);
    const decreaseButton = getDecreaseButton(numberInput);

    expect(increaseButton.querySelector('jb-icon-plus')).toBeTruthy();
    expect(decreaseButton.querySelector('jb-icon-minus')).toBeTruthy();

    numberInput.value = '0';

    await userEvent.click(increaseButton);

    await waitFor(() => {
      expect(numberInput.value).toBe('100');
      expect(nativeInput.value).toBe('100');
      expect(args.onChange).toHaveBeenCalled();
    });

    await userEvent.click(decreaseButton);

    await waitFor(() => {
      expect(numberInput.value).toBe('0');
      expect(nativeInput.value).toBe('0');
      expect(args.onChange).toHaveBeenCalledTimes(2);
    });
  }
};

export const ControlButtonSizeVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem', width: '20rem' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
        <JBNumberInput key={size} label={`${size} size`} size={size} showControlButton />
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const numberInputs = Array.from(canvasElement.querySelectorAll<JBNumberInputWebComponent>('jb-number-input'));
    const buttonWidths = numberInputs.map(numberInput => parseFloat(getComputedStyle(getIncreaseButton(numberInput)).width));
    const iconHeights = numberInputs.map(numberInput => {
      const icon = getIncreaseButton(numberInput).querySelector('jb-icon-plus');
      if (!icon) throw new Error('Increase icon was not rendered');
      return parseFloat(getComputedStyle(icon).height);
    });

    expect(buttonWidths).toEqual([...buttonWidths].sort((a, b) => a - b));
    expect(iconHeights).toEqual([...iconHeights].sort((a, b) => a - b));
    expect(new Set(buttonWidths).size).toBe(5);
    expect(new Set(iconHeights).size).toBe(5);
  }
};

export const ControlledTypingKeepsFocus: Story = {
  render: () => {
    const [value, setValue] = React.useState('');

    return <JBNumberInput label="Controlled value" value={value} onInput={event => setValue(event.target.value)} showControlButton />;
  },
  play: async ({ canvasElement }) => {
    const numberInput = getNumberInput(canvasElement);
    const nativeInput = getNativeInput(numberInput);
    nativeInput.focus();

    for (const character of ['1', '2', '3']) {
      await userEvent.keyboard(character);
      await waitFor(() => {
        expect(nativeInput.getRootNode()).toHaveProperty('activeElement', nativeInput);
      });
    }

    expect(numberInput.value).toBe('123');
    expect(nativeInput.value).toBe('123');
  }
};

export const NumberWithPersianChar: Story = {
  args: {
    label: 'type number',
    message: 'type en number but user see persian char number',
    showPersianNumber: true,
    onChange: (e) => { console.log(`new number is ${e.target.value}`); }
  }, 
  play: async ({ canvasElement }) => {
    const numberInput = getNumberInput(canvasElement);
    const nativeInput = getNativeInput(numberInput);

    await userEvent.type(nativeInput, '1234567');

    await waitFor(() => {
      expect(numberInput.value).toBe('1234567');
      expect(numberInput.displayValue).toBe('۱۲۳۴۵۶۷');
      expect(nativeInput.value).toBe('۱۲۳۴۵۶۷');
    });

    numberInput.value = '9876';

    await waitFor(() => {
      expect(numberInput.value).toBe('9876');
      expect(nativeInput.value).toBe('۹۸۷۶');
    });
  }
};

export const WithError: Story = {
  args: {
    label: 'show error',
    error: 'error message',
  }
};

export const numberTest: Story = {
  render: () => <JBInputNumberTest></JBInputNumberTest>,
};

export const WithStartSection: Story = {
  render: (args) => {
    return (
      <JBNumberInput {...args}>
        <div slot="inline-start" style={{ width: '1.5rem', height: '1.5rem', backgroundColor: '#262626' }}></div>
      </JBNumberInput>
    );
  },
  args: {
    label: 'label',
    message: 'static text under input show all the time',
    placeholder: 'place holder'
  }
};


export const WithEndSection: Story = {
  render: (args) => {
    return (
      <JBNumberInput {...args}>
        <div slot="inline-end" style={{ width: '1.5rem', height: '1.5rem', backgroundColor: '#262626' }}></div>
      </JBNumberInput>
    );
  },
  args: {
    label: 'label',
    message: 'static text under input show all the time',
    placeholder: 'place holder'
  }
};

export const WithStartAndEndSection: Story = {
  render: (args) => {
    return (
      <JBNumberInput {...args}>
        <div slot="inline-end" style={{ width: '1.5rem', height: '1.5rem', backgroundColor: '#262626' }}></div>
        <div slot="inline-start" style={{ width: '1.5rem', height: '1.5rem', backgroundColor: '#262626' }}></div>
      </JBNumberInput>
    );
  },
  args: {
    label: 'label',
    message: 'static text under input show all the time',
    placeholder: 'place holder'
  }
};

