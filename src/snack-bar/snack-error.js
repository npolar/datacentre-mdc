import { SnackBar } from "./snack-bar.js";
import { css } from "lit-element";
export class SnackError extends SnackBar {
  static get styles() {
    return [
      super.styles,
      css`
        .mdc-snackbar__surface {
          background: var(--mdc-theme-error);
        }
      `
    ];
  }
  constructor() {
    super();
    this.leading = false;
  }
}
customElements.define("snack-error", SnackError);
