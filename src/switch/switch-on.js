import { css, html } from "lit-element";
import { SwitchBase } from "@material/mwc-switch/mwc-switch-base.js";
import { style } from "@material/mwc-switch/mwc-switch-css.js";
import { ripple } from "@material/mwc-ripple/ripple-directive.js";

import "@material/mwc-formfield";

// export const render = ({ checked, label, id = label, html } = {}) => html`
//   <mwc-formfield label=${label}>
//     <mwc-switch ?checked=${checked}></mwc-switch>
//   </mwc-formfield>
// `;

export class SwitchOn extends SwitchBase {
  static get styles() {
    return [
      style,
      css`
        .mdc-switch {
          font-family: var(--mdc-theme-font-family);
        }
      `
    ];
  }

  firstUpdated() {
    ///super.firstUpdated();
    this.mdcRoot.addEventListener("change", e => {
      this.dispatchEvent(new Event("change", e));
    });
  }

  __render() {
    return html`
      <div class="mdc-switch">
        <div class="mdc-switch__track"></div>
        <div
          class="mdc-switch__thumb-underlay"
          .ripple="${ripple({
            interactionNode: this
          })}"
        >
          <div class="mdc-switch__thumb">
            <input
              type="checkbox"
              id="basic-switch"
              class="mdc-switch__native-control"
              role="switch"
              @change="${this._changeHandler}"
            />
          </div>
        </div>
      </div>
      <slot></slot>
    `;
  }
}
customElements.define("switch-on", SwitchOn);
