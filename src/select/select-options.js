import { render } from "lit-html";
import { Select } from "./select.js";
import { options } from "./option-html.js";

// Convenience element that inject an <option> element for each enum member
// Use:
// <select-enum name="area"
//  enum='["Svalbard", "Jan Mayen", "Bouvetøya", "Peter I Øy", "Dronning Maud Land"]'>
// </select-enum>
// @todo SelectEnum i18n
// @todo SelectEnum: move render of options to parent
export class SelectOptions extends Select {
  static get properties() {
    return {
      ...super.properties,
      enum: { type: Array }
    };
  }

  firstUpdated() {
    // const select = this.renderRoot.querySelector("select");
    // render(options(this.value, { enum: this.enum }), select);
    // super.firstUpdated();
  }
}
customElements.define("select-options", SelectOptions);
