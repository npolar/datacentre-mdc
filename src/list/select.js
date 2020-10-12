import { css, html, LitElement } from "lit-element";
import { classMap } from "lit-html/directives/class-map.js";

import { MDCSelect } from "@material/select";
import { cssClasses, strings } from "@material/select/";
const { CHANGE_EVENT } = strings;
const {
  ROOT,
  DISABLED,
  REQUIRED,
  OUTLINED,
  SELECTED,
  ACTIVATED,
  SELECTED_ITEM_CLASS
} = cssClasses;
import { emit } from "../host.js";
import { CHANGE } from "../event.js";
import scss from "./select-scss.js";

// The select uses an MDCMenu component instance to contain the list of options, but uses the data-value attribute instead of value to represent the options' values.
// NOTE: The data-value attribute must be present on each option.

const listOption = ({
  value = "",
  text = value,
  role = "option",
  selected,
  html
} = {}) =>
  html`
    <li
      class="mdc-list-item ${selected ? SELECTED_ITEM_CLASS : ""}"
      aria-selected="${selected}"
      data-value="${value}"
      role="${role}"
    >
      ${text}
    </li>
  `;

const _mdcselect = Symbol();
export class ListSelect extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      path: { type: String },
      value: { type: String },
      label: { type: String },
      options: { type: Array },
      enum: { type: Array },
      selectedIndex: { type: Number },
      valid: { type: Boolean },
      activated: { type: Boolean },
      selected: { type: Boolean },
      required: { type: Boolean },
      disabled: { type: Boolean },
      outlined: { type: Boolean }
    };
  }

  static get styles() {
    return [scss, css``];
  }

  constructor() {
    super();
    this.outlined = true;
    this.valid = true;
    this.required = false;
    this.disabled = false;
    this.selected = false;
    this.selectedIndex = -1;
    this.activated = true;
    this.list = [];
  }

  firstUpdated() {
    let { options } = this;
    if (!options && this.enum && this.enum.length > 0) {
      options = this.enum.map(e => {
        return { value: e };
      });
      this.options = [...options];
    }
    let {
      //name,
      //path,
      value,
      //label,
      selectedIndex,
      valid,
      activated,
      selected,
      required,
      disabled
      //outlined
    } = this;
    if (value !== undefined) {
      activated = true;
      selected = true;
      selectedIndex = options.findIndex(o => o.value === value);
    } else {
      valid =
        selectedIndex >= 0 && required === true && value === undefined
          ? false
          : true;
    }

    const host = this.domquery(".mdc-select");
    const s = new MDCSelect(host);

    // NOTE: To programmatically set a select as required, use the required property in the MDCSelect API.
    // https://github.com/material-components/material-components-web/tree/master/packages/mdc-select#mdcselect-api
    s.value = value;
    s.selectedIndex = selectedIndex;
    s.required = required;
    s.disabled = disabled;
    s.valid = valid;
    this[_mdcselect] = s;
    host.addEventListener(CHANGE_EVENT, this);
    host.addEventListener("change", e => console.log(e));
  }

  domquery(qs) {
    return this.renderRoot.querySelector(qs);
  }

  handleEvent(e) {
    const { value, index } = e.detail;
    if (value !== this.value) {
      const input = this.domquery("input");
      this.value = value;
      input.value = value;
      emit(input, "change", { index, value });
      emit(input, CHANGE, { index, value });
    }

    // if (Number(index) === index) {
    //   emit(input, "change", { index, value });
    //   emit(input, CHANGE, { index, value });
    // }
    // @todo selectedIndex
    // console.log(this.selectedIndex);
  }
  render() {
    const {
      path,
      name,
      value,
      label,
      options,
      activated,
      selected,
      required,
      disabled,
      outlined
    } = this;

    // https://github.com/material-components/material-components-web/tree/master/packages/mdc-select#accessibility-a11y
    // https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html
    return html`
    <div class=${classMap({
      [ROOT]: true,
      [ACTIVATED]: activated,
      [SELECTED]: selected,
      [DISABLED]: disabled,
      [OUTLINED]: outlined,
      [REQUIRED]: required
    })}>
    <input type="hidden" path=${path} name=${name} .value=${value}></input>
    <div class="mdc-select__anchor">
      <i class="mdc-select__dropdown-icon"></i>
      <div class="mdc-select__selected-text" role="button" aria-haspopup="listbox" aria-labelledby="outlined-select-label" aria-disabled="${disabled}"></div>
      <div class="mdc-notched-outline">
        <div class="mdc-notched-outline__leading"></div>
        <div class="mdc-notched-outline__notch">
          <label id="outlined-select-label" class="mdc-floating-label">${label}</label>
        </div>
        <div class="mdc-notched-outline__trailing"></div>
      </div>
    </div>


  <div class="mdc-select__menu mdc-menu mdc-menu-surface" role="listbox">
    <ul class="mdc-list">
      ${(options || []).map(li => {
        li.selected = value === li.value;
        return listOption({ ...li, html });
      })}
    </ul>
  </div>
</div>`;
  }
}
customElements.define("list-select", ListSelect);
//<li class="mdc-list-item mdc-list-item--selected" aria-selected="true" role="option" data-value=""></li>
