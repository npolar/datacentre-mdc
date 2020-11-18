import { css } from "lit-element";
import { ListItemBase } from "@material/mwc-list/mwc-list-item-base.js";
import styles from "./list-item-scss.js";

const jscss = css`
  :host {
    font-family: var(--mdc-icon-font, "Inter var");
  }
`;

console.log("Deprecated: list-item");
export class ListItem extends ListItemBase {
  static get styles() {
    return [styles, jscss];
  }
}
customElements.define("list-item", ListItem);
