import { FabBase } from "@material/mwc-fab/mwc-fab-base.js";
import style from "./button-fab-scss.js";

export class ButtonFab extends FabBase {
  static get styles() {
    return style;
  }
}
customElements.define("button-fab", ButtonFab);
