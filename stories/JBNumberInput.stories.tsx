import React from 'react';
import { JBNumberInput } from 'jb-number-input/react';
import JBInputNumberTest from './samples/JBInputNumberTest';
import type { Meta, StoryObj } from '@storybook/react';
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
      expect(numberInput.displayValue).toBe('12.34');
      expect(nativeInput.value).toBe('12.34');
      expect(numberInput.reportValidity()).toBe(true);
    });

    numberInput.value = '45text67';

    await waitFor(() => {
      expect(numberInput.value).toBe('4567');
      expect(nativeInput.value).toBe('4567');
    });
  }
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
        <div slot="start-section" style={{ width: '1.5rem', height: '1.5rem', backgroundColor: '#262626' }}></div>
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
        <div slot="end-section" style={{ width: '1.5rem', height: '1.5rem', backgroundColor: '#262626' }}></div>
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
        <div slot="end-section" style={{ width: '1.5rem', height: '1.5rem', backgroundColor: '#262626' }}></div>
        <div slot="start-section" style={{ width: '1.5rem', height: '1.5rem', backgroundColor: '#262626' }}></div>
      </JBNumberInput>
    );
  },
  args: {
    label: 'label',
    message: 'static text under input show all the time',
    placeholder: 'place holder'
  }
};

