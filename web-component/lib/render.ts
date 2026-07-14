import { i18n } from "jb-core/i18n";
import { dictionary } from "./i18n";

export function renderButtonsHTML(): string {
  return /* html */ `
  <div class="number-control-buttons">
    <button class="increase-number-button number-control-button" type="button" aria-label="${dictionary.get(i18n, "increaseValue")}">
        <svg class="increase-icon" viewBox="0 0 120 120" aria-hidden="true">
            <path  stroke-linecap="round" d="M60,40 L60,80"></path>
            <path  stroke-linecap="round" d="M40,60 L80,60"></path>
        </svg>
    </button>
    <button class="decrease-number-button number-control-button" type="button" aria-label="${dictionary.get(i18n, "decreaseValue")}">
        <svg class="decrease-icon" viewBox="0 0 120 120" aria-hidden="true">
            <path  stroke-linecap="round" d="M40,60 L80,60"></path>
        </svg>
    </button>
  </div>
  `;
}
