import style from "./button-scss.js";
import { ButtonBase } from "@material/mwc-button/mwc-button-base.js";
import { PRIMARY, getThemeProperties } from "../host/theme.js";

export class Button extends ButtonBase {
  static get properties() {
    return {
      secondary: { type: Boolean }
    };
  }
  static get styles() {
    return [style];
  }
  updated(p) {
    const { secondary } = this;
    if (p.has("secondary") && secondary) {
      const { secondary } = getThemeProperties(this);
      this.style.setProperty(PRIMARY, secondary);
    } else {
      this.style.removeProperty(PRIMARY);
    }
    super.updated(p);
  }
}
customElements.define("button-mdc", Button);
customElements.whenDefined("button-mdc").then(() => {
  console.warn("Deprecated element: button-mdc, use button-up");
});
