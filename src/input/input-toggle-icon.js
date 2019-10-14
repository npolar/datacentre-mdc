import { Input } from "./input-mdc.js";
import "@material/mwc-icon-button-toggle";
import { emit } from "../host.js";
import { html } from "lit-html";

// Outlined input field with (trailing) toggle icon, use like:
// <input-toggle-icon autocomplete="" onIcon="visibility" offIcon="visibility_off" label="Nice toggle?"></input-toggle-icon>
//
// Events: "input-toggle-icon" events are emitted on toggling with { isOn } as payload
export class InputToggleIcon extends Input {
  static get properties() {
    return {
      on: { type: Boolean },
      autocomplete: { type: String },
      onIcon: { type: String },
      offIcon: { type: String }
    };
  }

  constructor() {
    super();
    this.on = false;
    this.iconTrailing = true; // needs to be !undefined
  }

  renderIcon() {
    const { onIcon, offIcon, on } = this;
    return html`
      <mwc-icon-button-toggle
        onIcon="${onIcon}"
        offIcon="${offIcon}"
        ?on=${on}
      ></mwc-icon-button-toggle>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.renderRoot.addEventListener("MDCIconButtonToggle:change", e => {
      emit(this, "input-toggle-icon", e.detail);
    });
  }
}
customElements.define("input-toggle-icon", InputToggleIcon);
