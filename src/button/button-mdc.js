import { style } from "./button-style.js";
import { ButtonBase } from "@material/mwc-button/mwc-button-base.js";

export class Button extends ButtonBase {
  static get styles() {
    return [style];
  }
}
customElements.define("button-mdc", Button);
