import { IconButtonBase } from "@material/mwc-icon-button/mwc-icon-button-base.js";
import style from "./button-icon-scss.js";

// import "@material/mwc-icon-button";
// import "@material/mwc-icon-button-toggle";

export class ButtonIcon extends IconButtonBase {
  static get styles() {
    return style;
  }
}
customElements.define("button-icon", ButtonIcon);
