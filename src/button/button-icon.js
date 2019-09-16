import { style } from "./button-icon-style.js";
import { style as mwcStyle } from "@material/mwc-icon-button/mwc-icon-button-css.js";

import { ButtonIconBase } from "./button-icon-base.js";
//import { IconButton } from "@material/mwc-icon-button/mwc-icon-button.js";
export class ButtonIcon extends ButtonIconBase {
  static get styles() {
    return style;
  }
}
customElements.define("button-icon", ButtonIcon);
