import { render } from "lit-html";
import { Select } from "./select.js";
import { options } from "./option-html.js";

// Convenience element that inject an <option> element for each enum member
// <select-enum name="area"
//  enum='["Svalbard", "Jan Mayen", "Bouvetøya", "Peter I Øy", "Dronning Maud Land"]'>
// </select-enum>
export class SelectEnum extends Select {
  static get properties() {
    const reflect = true;
    return {
      ...super.properties,
      enum: { type: Array }
    };
  }

  firstUpdated() {
    const select = this.renderRoot.querySelector("select");
    render(options(this.value, { enum: this.enum }), select);
    super.firstUpdated();
  }
}
customElements.define("select-enum", SelectEnum);
