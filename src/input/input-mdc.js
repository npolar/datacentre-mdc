import { TextFieldBase } from "@material/mwc-textfield/mwc-textfield-base.js";
import { style } from "./input-style.js";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

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
      maxlength: { type: Number },
      name: { type: String, reflect: true },
      readonly: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.readonly = false;
    this.outlined = true;
    //this.autocomplete = ""; // check datalist!
  }

  firstUpdated() {
    if (this.hasAttribute("fullwidth")) {
      this.removeAttribute("outlined");
    }
    super.firstUpdated();
  }

  updated(p) {
    // Needed or else the floating label does not float when setting value programmatically
    if (p.has("value") && "mdcFoundation" in this) {
      this.mdcFoundation.setValue(this.value);
    }
    super.updated(p);
  }
  // Copied from [mwc-textfield-base.ts](https://github.com/material-components/material-components-web-components/blob/master/packages/textfield/src/mwc-textfield-base.ts)
  // to add attributes: "name", "autocomplete", "minlength", "minlength", "readonly"
  // Parent's [readme](https://github.com/material-components/material-components-web-components/tree/master/packages/textfield)
  //
  // protected renderInput() {
  //   const maxOrUndef = this.maxLength === -1 ? undefined : this.maxLength;
  //   return html`
  //     <input
  //         id="text-field"
  //         class="mdc-text-field__input"
  //         type="${this.type}"
  //         .value="${this.value}"
  //         ?disabled="${this.disabled}"
  //         placeholder="${this.placeholder}"
  //         ?required="${this.required}"
  //         maxlength="${ifDefined(maxOrUndef)}"
  //         pattern="${ifDefined(this.pattern ? this.pattern : undefined)}"
  //         min="${ifDefined(this.min === '' ? undefined : this.min as number)}"
  //         max="${ifDefined(this.max === '' ? undefined : this.max as number)}"
  //         step="${ifDefined(this.step === null ? undefined : this.step)}"
  //         @input="${this.handleInputChange}"
  //         @blur="${this.onInputBlur}">`;
  // }
  renderInput() {
    return html`
      <input
        id="text-field"
        class="mdc-text-field__input"
        type=${this.type}
        name=${ifDefined(this.name ? this.name : undefined)}
        value=${ifDefined(this.value ? this.value : undefined)}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        ?required=${this.required}
        pattern=${ifDefined(this.pattern ? this.pattern : undefined)}
        placeholder=${ifDefined(
          this.placeholder ? this.placeholder : undefined
        )}
        minlength=${ifDefined(this.minlength ? this.minlength : undefined)}
        maxlength=${ifDefined(this.maxlength ? this.maxlength : undefined)}
        min=${ifDefined(this.min ? Number(this.min) : undefined)}
        max=${ifDefined(this.max ? Number(this.max) : undefined)}
        step=${ifDefined(this.step ? this.step : undefined)}
        @input=${this.handleInputChange}
        @blur=${this.onInputBlur}
        autocomplete=${ifDefined(
          this.autocomplete ? this.autocomplete : undefined
        )}
      />
    `;
  }
}
customElements.define("input-mdc", Input);
