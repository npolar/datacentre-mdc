import { css } from "lit-element";
import { SnackbarBase } from "@material/mwc-snackbar/mwc-snackbar-base.js";
import { style } from "@material/mwc-snackbar/mwc-snackbar-css.js";

export class SnackBar extends SnackbarBase {
  static get styles() {
    return [
      style,
      css`
        .mdc-snackbar__label {
          font-family: var(--mdc-theme-font-family);
        }
      `
    ];
  }
  constructor() {
    super();
    this.leading = true;
  }
}
customElements.define("snack-bar", SnackBar);
