import { SnackBar } from "../snack-bar/snack-bar.js";
import { get as tr } from "lit-translate";
export class FetchOK extends SnackBar {
  constructor() {
    super();
    window.addEventListener(
      "fetch-ok",
      ({ detail: { status, statusText, url, method } }) => {
        console.log("fetch-ok <-", { status, statusText, url, method });
        this.labelText = `${status} ${tr(statusText)}`;
        this.open();
      }
    );
  }
}
customElements.define("fetch-ok", FetchOK);
