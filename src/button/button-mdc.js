import { style } from "./button-style.js";
import { style as iconStyle} from "./button-icon-style.js";
import { ButtonBase } from "@material/mwc-button/mwc-button-base.js";

export class Button extends ButtonBase {}
Button.styles = [iconStyle,style];
customElements.define("button-mdc", Button);
