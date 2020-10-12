import { SelectBase } from "@material/mwc-select/mwc-select-base.js";
import styles from "./select-scss.js";

export class Select extends SelectBase {
  static get styles() {
    return styles;
  }
}
customElements.define("select-1", Select);
