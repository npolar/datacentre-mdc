import { LitElement, html, css } from "lit-element";
import { get as tg } from "lit-translate";
import { emit } from "../host.js";

import { Select } from "../select/select.js";
import { ListItem } from "../list/list-item.js";
export const defaultList = new Map([
  [undefined, "relevance"],
  ["-created"],
  ["-updated"]
]);

// Example use:
// <select-sort
//   .list=${sortList}
//   sort="${sort}"
//   lang="${lang}"
//   .tg="${tg}"
// ></select-sort>
const _slot = Symbol();
export class SelectSort extends LitElement {
  static get properties() {
    const reflect = true;
    return {
      sort: { type: String },
      lang: { type: String },
      list: { type: Map },
      translate: { type: Function }
    };
  }

  static get styles() {
    return css`
      .mdc-select__selected-text {
        color: red;
      }
    `;
  }

  constructor() {
    super();
    this.translate = tg;
    this.list = defaultList;
  }

  // firstUpdated() {
  //   this[_slot] = this.renderRoot.querySelector("slot");
  //   window.addEventListener("@npolar/lang", ({ detail: { lang } }) => {
  //     this.lang = lang;
  //     console.warn("FIXME <select-sort> is not refreshed on language change");
  //     // This cure is ineffective:
  //     // const select = this.renderRoot.querySelector("mwc-select");
  //     // select.layout();
  //   });
  // }

  // updated(p) {
  //   if (p.has("list")) {
  //     console.log(this.list);
  //     console.warn(this[_slot]);
  //   }
  // }

  render() {
    const { list, sort, lang, translate } = this;

    return html`
      <select-1 label="" icon="sort" .value="${sort}">
        ${[...list].map(
          ([field, name]) => html`
            <list-item
              ?selected=${sort === field}
              @request-selected="${() =>
                emit(this, "@npolar/sort", {
                  sort: field,
                  lang: lang,
                  label: tg(`sort.by.${name || field}`)
                })}"
              graphic="icon"
              value="${field}"
            >
              ${tg(`sort.by.${name || field}`)}
            </list-item>
          `
        )}
      </select-1>
    `;
  }
}
customElements.define("select-sort", SelectSort);
