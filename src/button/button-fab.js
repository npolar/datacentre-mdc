import { FabBase } from "@material/mwc-fab/mwc-fab-base.js";
import style from "./button-fab-scss.js";

// "MDC FAB uses MDC Theme’s secondary color by default"
// https://material.io/develop/web/components/buttons/floating-action-buttons/
export class ButtonFab extends FabBase {
  static get styles() {
    return style;
  }
}
customElements.define("button-fab", ButtonFab);
