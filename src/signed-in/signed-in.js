import { SnackBar } from "../snack-bar/snack-bar.js";
import { get as tr } from "lit-translate";
export class SignedIn extends SnackBar {
  constructor() {
    super();
    window.addEventListener("@npolar/sign-in", ({ detail: { jwt, user } }) => {
      console.warn("@npolar/sign-in", { jwt, user });
      this.labelText = `${user.name} ${tr("signed-in")}`;
      this.open();
    });
    window.addEventListener("@npolar/sign-out", ({ detail: { user } }) => {
      this.labelText = `${user.name} ${tr("signed-out")}`;
      this.open();
    });
  }
}
customElements.define("signed-in", SignedIn);
