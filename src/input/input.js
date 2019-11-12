import { TextFieldBase } from "@material/mwc-textfield/mwc-textfield-base.js";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { emit } from "../host.js";
import { INPUT, CHANGE } from "../event.js";
import style from "./input-scss.js";

export class Input extends TextFieldBase {
  static get styles() {
    return style;
  }

  static get properties() {
    const reflect = true;
    return {
      ...super.properties,
      value: { type: String },
      autocomplete: { type: String, reflect },
      minlength: { type: Number, reflect },
      maxlength: { type: Number, reflect },
      name: { type: String, reflect },
      readonly: { type: Boolean, reflect },
      autofocus: { type: Boolean, reflect }
    };
  }

  constructor() {
    super();
    this.readonly = false;
    this.disabled = false;
    this.outlined = true;
    this.autofocus = false;
    this.autocomplete = "off"; // @todo check datalist!
  }

  // <wl-textfield outlined label="Datalist" list="datalist"></wl-textfield>
  // <datalist id="datalist">
  //    <option value="Option 1"></option>
  //    <option value="Option 2"></option>
  //    <option value="Option 3"></option>
  // </datalist>

  get input() {
    return this.mdcFoundation;
  }

  firstUpdated() {
    if (this.hasAttribute("fullwidth")) {
      this.removeAttribute("outlined");
    }

    const input = this.renderRoot.querySelector("input");
    input.addEventListener("input", () => emit(this, INPUT));
    input.addEventListener("change", () => emit(this, CHANGE));
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
  // to add attributes: "autocomplete", "autofocus", "minlength", "minlength", "name", "readonly"
  // Parent's [readme](https://github.com/material-components/material-components-web-components/tree/master/packages/textfield)
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
        ?autofocus=${this.autofocus}
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
