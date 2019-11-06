import "weightless/select";
import { LitElement, html, css } from "lit-element";
import { emit } from "../host.js";
import { INPUT, CHANGE } from "../event.js";
import { options } from "./option-html.js";

// Single select list of options
// @todo i18n...
// Use:
// <select-enum name="area"
//  enum='["Svalbard", "Jan Mayen", "Bouvetøya", "Peter I Øy", "Dronning Maud Land"]'>
// </select-enum>
export class SelectEnum extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      value: { type: String },
      enum: { type: Array },
      translations: { type: Map }
    };
  }

  // [CSS vars](https://github.com/andreasbm/weightless/tree/master/src/lib/select#-css-custom-properties)
  static get styles() {
    return [
      css`
        :host {
          --input-font-family: "Inter var";
          --input-color: var(--mdc-theme-secondary);
          --input-label-color: var(--mdc-theme-primary);
          --select-arrow-height: 4;
        }
      `
    ];
  }

  constructor() {
    super();
    this.outlined = true;
    this.autocomplete = "off";
  }

  render() {
    const { name, label, value, outlined, autocomplete } = this;
    return html`
      <wl-select
        ?outlined==${outlined}
        autocomplete=${autocomplete}
        label=${label || name || ""}
        name="${name || ""}"
      >
        ${options(value, { enum: this.enum })}
      </wl-select>
    `;
  }

  firstUpdated() {
    const select = this.renderRoot.firstElementChild;
    select.addEventListener("input", () => emit(this, INPUT));
    select.addEventListener("change", () => emit(this, CHANGE));
    super.firstUpdated();
  }
}
customElements.define("select-enum", SelectEnum);
