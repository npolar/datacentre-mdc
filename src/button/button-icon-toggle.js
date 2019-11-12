import { IconButtonToggleBase } from "@material/mwc-icon-button-toggle/mwc-icon-button-toggle-base.js";
//import "@material/mwc-icon-button-toggle";
import style from "./button-icon-scss.js";

export class ButtonIconToggle extends IconButtonToggleBase {
  static get properties() {
    const reflect = true;
    return {
      ...super.properties,
      icon: { type: String, reflect },
      "icon-toggle": { type: String, reflect }
    };
  }

  constructor() {
    super();
    this.on = true;
  }

  attributeChangedCallback(name, was, value) {
    if ("icon" === name) {
      this.onIcon = value;
    }
    if ("icon-toggle" === name) {
      this.offIcon = value;
    }
    super.attributeChangedCallback(name, was, value);
  }

  static get styles() {
    return style;
  }
}
customElements.define("button-icon-toggle", ButtonIconToggle);
