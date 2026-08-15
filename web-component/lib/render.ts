import { i18n } from "jb-core/i18n";
import "jb-icons/minus";
import "jb-icons/plus";
import { dictionary } from "./i18n";

export function renderButtonsHTML(): string {
  return /* html */ `
  <div class="number-control-buttons">
    <button class="increase-number-button number-control-button" type="button" aria-label="${dictionary.get(i18n, "increaseValue")}">
        <jb-icon-plus class="increase-icon" aria-hidden="true"></jb-icon-plus>
    </button>
    <button class="decrease-number-button number-control-button" type="button" aria-label="${dictionary.get(i18n, "decreaseValue")}">
        <jb-icon-minus class="decrease-icon" aria-hidden="true"></jb-icon-minus>
    </button>
  </div>
  `;
}
