import type { JBNumberInputWebComponent } from 'jb-number-input';
import { expect } from 'storybook/test';

export function getNumberInput(canvasElement: HTMLElement, index = 0) {
  const numberInput = canvasElement.querySelectorAll<JBNumberInputWebComponent>('jb-number-input')[index];
  expect(numberInput).toBeTruthy();
  expect(numberInput!.shadowRoot).toBeTruthy();
  return numberInput!;
}

export function getNativeInput(numberInput: JBNumberInputWebComponent) {
  const input = numberInput.shadowRoot?.querySelector<HTMLInputElement>('input');
  expect(input).toBeTruthy();
  return input!;
}

export function getMessageText(numberInput: JBNumberInputWebComponent) {
  return numberInput.shadowRoot?.querySelector<HTMLElement>('.message-box')?.textContent ?? '';
}

export function getIncreaseButton(numberInput: JBNumberInputWebComponent) {
  const button = numberInput.shadowRoot?.querySelector<HTMLElement>('.increase-number-button');
  expect(button).toBeTruthy();
  return button!;
}

export function getDecreaseButton(numberInput: JBNumberInputWebComponent) {
  const button = numberInput.shadowRoot?.querySelector<HTMLElement>('.decrease-number-button');
  expect(button).toBeTruthy();
  return button!;
}
