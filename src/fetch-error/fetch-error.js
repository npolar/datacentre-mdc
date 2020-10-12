import { SnackError } from "../snack-bar/snack-error.js";
import { get as t } from "lit-translate";
export class FetchError extends SnackError {
  constructor() {
    super();
    window.addEventListener(
      "fetch-error",
      ({ detail: { status, statusText, method, url, body } }) => {
        this.labelText = `${t(`${status}`)} ${t(statusText)}`;
        this.open();
      }
    );
  }
}
customElements.define("fetch-error", FetchError);
