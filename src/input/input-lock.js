import { InputToggleIcon } from "./input-toggle-icon.js";

// A text input with lock/unlock icon toggle
// Usage:
// <input-lock label="DOI" value="https://doi.org/10.10/10"></input-lock>
export class InputLock extends InputToggleIcon {
  constructor() {
    super();
    this.onIcon = "lock";
    this.offIcon = "lock_open";
    this.lock();

    this.addEventListener("input-toggle-icon", e => {
      this.readonly = e.detail.isOn;
    });
    this.addEventListener("blur", () => {
      const t = this.renderRoot.querySelector("mwc-icon-button-toggle");
      t.on = true;
      this.lock();
    });
  }

  lock() {
    this.readonly = true;
    this.on = true;
  }
  unlock() {
    this.readonly = false;
    this.on = false;
  }
}
customElements.define("input-lock", InputLock);
