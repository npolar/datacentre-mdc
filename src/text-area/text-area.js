import { TextAreaBase } from "@material/mwc-textarea/mwc-textarea-base.js";
import { html } from "lit-html";

import { ifDefined } from "lit-html/directives/if-defined.js";

import scss from "./textarea-scss.js";
import style from "./style.js";

import { get as t } from "lit-translate";

export class Textarea extends TextAreaBase {
  static get styles() {
    return [scss, style];
  }

  static get properties() {
    return {
      name: { type: String },
      path: { type: String },
      value: { type: String },
      label: { type: String },
      rows: { type: Number },
      cols: { type: Number },
      disabled: { type: Boolean },
      outlined: { type: Boolean }
    };
  }

  // render() {
  //   const classes = {
  //     "mdc-text-field--disabled": this.disabled,
  //     "mdc-text-field--no-label": !this.label,
  //     "mdc-text-field--outlined": this.outlined,
  //     "mdc-text-field--fullwidth": this.fullWidth
  //   };
  //   return html`
  //   <div class="mdc-text-field mdc-text-field--textarea ${classMap(classes)}">
  //     ${this.renderCharCounter()}
  //     ${this.renderInput()}
  //     ${this.outlined ? this.renderOutlined() : this.renderLabelText()}
  //   </div>
  //   ${this.renderHelperText()}
  // `;
  // }
  renderInput() {
    const maxOrUndef = this.maxLength === -1 ? undefined : this.maxLength;
    return html`
      <textarea
        id="text-field"
        __path=${this.path}
        class="mdc-text-field__input"
        .value="${this.value}"
        rows="${this.rows}"
        cols="${this.cols}"
        ?disabled="${this.disabled}"
        placeholder="${this.placeholder}"
        ?required="${this.required}"
        maxlength="${ifDefined(maxOrUndef)}"
        @input="${this.handleInputChange}"
        @blur="${this.onInputBlur}"
      >
      </textarea>
    `;
  }
}

customElements.define("text-area", Textarea);
