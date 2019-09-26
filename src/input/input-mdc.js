export * from "@material/mwc-button";
export * from "@material/mwc-fab";

//import { TextFieldBase } from "@material/mwc-textfield/mwc-textfield-base.js";
import { style } from "./input-style.js";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { TextField as TextFieldBase } from "@material/mwc-textfield/mwc-textfield.js";

export class Input extends TextFieldBase {
  static get styles() {
    return style;
  }

  static get properties() {
    return {
      ...super.properties,
      value: { type: String },
      autocomplete: { type: String },
      minlength: { type: Number },
      name: { type: String, reflect: true },
      readonly: { type: Boolean }
    };
  }

  // Without this pair of value setter/getter, the floating label does not float when setting value programmatically
  // The value floats up again, see parent's #handleInputChange method
  // attributeChangedCallback(attr, was, is) {
  //   console.warn({ attr, was, is });
  //   super.attributeChangedCallback();
  // }

  constructor() {
    super();
    this.readonly = false;
    this.outlined = true;
    //this.autocomplete = ""; // check datalist!
  }

  updated(p) {
    if (p.has("value") && "mdcFoundation" in this) {
      this.mdcFoundation.setValue(this.value);
    }
  }
  // x

  // Copied from [parent](https://github.com/material-components/material-components-web-components/blob/3cdcf1acd529f244d62dac4f777545309f397cd0/packages/textfield/src/mwc-textfield-base.ts#L186),
  // to add attributes: "name", "autocomplete", "minlength", "readonly" (and remove "id")
  // Parent's [readme](https://github.com/material-components/material-components-web-components/tree/master/packages/textfield)
  renderInput() {
    return html`
      <input
        id="text-field"
        class="mdc-text-field__input"
        type="${this.type}"
        name="${this.name}"
        value="${this.value}"
        ?disabled="${this.disabled}"
        ?readonly="${this.readonly}"
        placeholder="${this.placeholder}"
        ?required="${this.required}"
        minlength="${ifDefined(this.minlength) ? this.minlength : undefined}"
        maxlength="${this.maxLength}"
        ?pattern="${ifDefined(this.pattern) ? this.pattern : undefined}"
        min="${ifDefined(this.min === "" ? undefined : Number(this.min))}"
        max="${ifDefined(this.max === "" ? undefined : Number(this.max))}"
        step="${ifDefined(this.step === null ? undefined : this.step)}"
        @change="${this.handleInputChange}"
        @blur="${this.onInputBlur}"
        autocomplete="${ifDefined(this.autocomplete)
          ? this.autocomplete
          : undefined}"
      />
    `;
  }
}
customElements.define("input-mdc", Input);
