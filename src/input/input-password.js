import { InputToggleIcon } from "./input-toggle-icon.js";

// A password input with visiblity "eye" toggle to show/hide password
// Defaults to login form usage, ie. autocomplete="current-password", see:
// https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands
//
// Usage:
// <input-password></input-password>
// <input-password placeholder="Make it strong" label="New password" autocomplete="new-password"></input-password>
// <input-password placeholder="Enter password" label="Password" autocomplete="current-password"></input-password>
export class InputPassword extends InputToggleIcon {
  constructor() {
    super();
    this.type = "password";
    this.onIcon = "visibility";
    this.offIcon = "visibility_off";
    this.autocomplete = "current-password";
    this.minLength = 8;
    this.required = true;
    this.label = "password";
    this.addEventListener("input-toggle-icon", e => {
      const [input] = e.composedPath();
      input.type = e.detail.isOn ? "text" : "password";
    });
  }
}
customElements.define("input-password", InputPassword);
