import React from 'react';
import { JBNumberInput, Props } from 'jb-number-input/react';
import JBInputNumberTest from './samples/JBInputNumberTest';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<Props> = {
  title: "Components/form elements/Inputs/JBNumberInput",
  component: JBNumberInput,
};
export default meta;
type Story = StoryObj<typeof JBNumberInput>;

export const Normal: Story = {
  args: {
    label: 'label',
    message: 'static text under input show all the time',
    placeholder: 'place holder',
    disabled: false,
    onChange: (e) => { console.log(`new number is ${e.target.value}`); }
  }
};

export const NumberWithComma: Story = {
  args: {
    label: 'with thousand separator',
    message: 'type a big number. each 3 number will separated by a comma',
    showThousandSeparator: true,
    onChange: (e) => { console.log(`new number is ${e.target.value}`); }
  }
};

export const NumberWithMinMax: Story = {
  args: {
    label: 'with min 100 & max 1000',
    message: 'type smaller or larger number, after un-focus it will turn to max or min(it does not prevent user from typing)',
    maxValue: 10000,
    minValue: 100,
    onChange: (e) => { console.log(`new number is ${e.target.value}`); }
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
  }
};
export const NumberWithButtons: Story = {
  args: {
    label: 'with increase and decrease button',
    message: 'with +- buttons',
    showControlButton: true,
    step: 100,
    onChange: (e) => { console.log(`new number is ${e.target.value}`); }
  }
};

export const NumberWithPersianChar: Story = {
  args: {
    label: 'type number',
    message: 'type en number but user see persian char number',
    showPersianNumber: true,
    onChange: (e) => { console.log(`new number is ${e.target.value}`); }
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
        <div slot="start-section" style={{ width: '24px', height: '24px', backgroundColor: '#262626' }}></div>
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
        <div slot="end-section" style={{ width: '24px', height: '24px', backgroundColor: '#262626' }}></div>
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
        <div slot="end-section" style={{ width: '24px', height: '24px', backgroundColor: '#262626' }}></div>
        <div slot="start-section" style={{ width: '24px', height: '24px', backgroundColor: '#262626' }}></div>
      </JBNumberInput>
    );
  },
  args: {
    label: 'label',
    message: 'static text under input show all the time',
    placeholder: 'place holder'
  }
};

