import { IconButtonBase } from "@material/mwc-icon-button/mwc-icon-button-base.js";
import { style } from "./button-icon-style.js";

export class ButtonIcon extends IconButtonBase {
  static get styles() {
    return style;
  }
}
customElements.define("button-icon", ButtonIcon);
