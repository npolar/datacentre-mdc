import { css, html } from "lit-element";
import sharedStyle from "../style/shared-scss.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { emit } from "../host.js";
import { INPUT, CHANGE } from "../event.js";
import { Select as WLSelect } from "weightless/select";

// Select element extending https://github.com/andreasbm/weightless/tree/master/src/lib/select
export class Select extends WLSelect {
  static get properties() {
    const reflect = true;
    return {
      ...super.properties,
      role: { type: String, reflect }
    };
  }

  static get styles() {
    return [
      super.styles,
      sharedStyle,
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
    this.role = "listbox";
    this.label = this.name;
  }

  firstUpdated() {
    const select = this.renderRoot.querySelector("select");
    select.addEventListener("input", () => emit(this, INPUT));
    select.addEventListener("change", () => emit(this, CHANGE));
    super.firstUpdated();
  }

  // Added https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role
  // @todo File issue for missing aria role
  renderFormElement() {
    return html`
      <div>
        <select
          id="${this.formElementId}"
          .value="${this.value}"
          ?required="${this.required}"
          ?disabled="${this.disabled}"
          ?readonly="${this.readonly}"
          role="listbox"
          name="${ifDefined(this.name)}"
          autocomplete="${ifDefined(this.autocomplete)}"
          tabindex="${this.disabled ? -1 : 0}"
          label="${ifDefined(this.label)}"
          aria-label="${ifDefined(this.label)}"
        ></select>
        <svg
          id="arrow"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 25"
          preserveAspectRatio="none"
        >
          <polygon points="0,0 50,0 25,25" />
        </svg>
      </div>
    `;
  }
}
customElements.define("select-mdc", Select);
