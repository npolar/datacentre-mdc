import { TextFieldBase } from "@material/mwc-textfield/mwc-textfield-base.js";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { classMap } from "lit-html/directives/class-map.js";
import { emit } from "../host.js";
import { INPUT, CHANGE } from "../event.js";
import style from "./input-scss.js";

const { stringify } = JSON;

export class Input extends TextFieldBase {
  static get styles() {
    return style;
  }
}

export class InputText extends TextFieldBase {
  static get styles() {
    return style;
  }

  static get properties() {
    const reflect = true;
    return {
      ...super.properties,
      type: { type: String },
      value: { type: String },
      step: { type: String },
      autocomplete: { type: String, reflect },
      minlength: { type: Number, reflect },
      maxlength: { type: Number, reflect },
      name: { type: String, reflect },
      path: { type: String, reflect },
      size: { type: String, reflect },
      readonly: { type: Boolean, reflect },
      autofocus: { type: Boolean, reflect },
      errors: { type: Array }
    };
  }

  get valueAsNumber() {
    return Number(this.value);
  }

  constructor() {
    super();
    this.readonly = false;
    this.disabled = false;
    this.outlined = true;
    this.autofocus = false;
    this.validationMessage = "";
    this.validateOnInitialRender = true;
    this.autocomplete = "off";
  }

  get foundation() {
    return this.mdcFoundation; //MDCTextFieldFoundation
  }

  get input() {
    return this.renderRoot.querySelector("input");
  }

  firstUpdated() {
    if (this.hasAttribute("fullwidth")) {
      this.removeAttribute("outlined");
    }
    this.input.addEventListener("input", () => emit(this, INPUT));
    this.input.addEventListener("input", e => console.log(this, e));
    this.input.addEventListener("change", () => emit(this, CHANGE));
    super.firstUpdated();
  }

  updated(p) {
    if (p.has("value") && "mdcFoundation" in this) {
      //const { value } = this;
      // [Was] Needed or else the floating label does not float when setting value programmatically
      //this.mdcFoundation.setValue(value);
      this.errors = Object.entries(this.validity)
        .filter(([k, v]) => !["valid", "customError"].includes(k) && v === true)
        .map(([k]) => k);

      if (this.errors.length > 0) {
        this.setCustomValidity(stringify(this.errors));
      } else {
        this.setCustomValidity("");
      }
    }
    super.updated(p);
  }
  // Modified from [mwc-textfield-base.ts](https://github.com/material-components/material-components-web-components/blob/master/packages/textfield/src/mwc-textfield-base.ts)
  // to add attributes: "autocomplete", "autofocus", "minlength", "minlength", "name", "readonly"
  // Parent's [readme](https://github.com/material-components/material-components-web-components/tree/master/packages/textfield)
  renderInput() {
    return html`
      <input
        id="text-field"
        class="mdc-text-field__input"
        type=${this.type}
        name=${ifDefined(this.name ? this.name : undefined)}
        path=${ifDefined(this.path ? this.path : undefined)}
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
        size=${ifDefined(this.size ? this.size : undefined)}
        @input=${this.handleInputChange}
        @blur=${this.onInputBlur}
        autocomplete=${ifDefined(
          this.autocomplete ? this.autocomplete : undefined
        )}
      />
    `;
  }

  renderHelperText(charCounterTemplate) {
    const showValidationMessage =
      this.validationMessage && this.validationMessage.length;
    const classes = {
      "mdc-text-field-helper-text--persistent": this.helperPersistent,
      "mdc-text-field-helper-text--validation-msg": true
    };
    const rootClasses = {
      hidden: !this.shouldRenderHelperText
    };
    return html`
      <div class="mdc-text-field-helper-line ${classMap(rootClasses)}">
        <div class="mdc-text-field-helper-text ${classMap(classes)}">
          ${showValidationMessage ? this.validationMessage : this.helper}
        </div>
        ${charCounterTemplate}
      </div>
    `;
  }
}
customElements.define("input-mdc", Input);
customElements.define("input-text", class InputText extends Input {});
customElements.define(
  "input-number",
  class InputNumber extends InputText {
    constructor() {
      super();
      this.type = "number";
    }
  }
);
