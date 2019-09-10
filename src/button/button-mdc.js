import { style } from "./button-style.js";
import { ButtonBase } from "@material/mwc-button/mwc-button-base.js";

export class Button extends ButtonBase {}
Button.styles = style;
customElements.define("button-mdc", Button);
