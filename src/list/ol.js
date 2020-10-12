import { html } from "lit-html";
import { ListBase } from "./base.js";
import { li } from "./li.js";

const lang = "no";
const { compare } = new Intl.Collator(lang, {
  ignorePunctuation: true,
  caseFirst: "lower"
});

const reverseSorter = (text, compare) => (a, b) => compare(text(a), text(b));

const _renderOL = (
  list = [],
  { text, text2, href, li } = {}
) => html`<ol class="mdc-list mdc-list--two-line"><slot>
  ${
    list && list.length > 0
      ? list.map(item => li(item, { text, href, text2 }))
      : ""
  }
</slot></ol>`;

export class OrderedList extends ListBase {
  static get properties() {
    const reflect = true;
    return {
      ...super.properties,
      reverse: { type: Boolean },
      "sort-by": { type: String },
      text: { type: Function },
      text2: { type: Function },
      href: { type: Function },
      compare: { type: Function }
    };
  }

  constructor() {
    super();
    this.ordered = true;
    this.li = li;
    this.compare = compare;
  }

  sort(list, { reverse = false } = {}) {
    const { text, compare, sortby } = this;

    if (list && list.length > 1 && text && compare) {
      if (reverse) {
        return list.sort((b, a) => compare(text(a), text(b)));
      }
      return list.sort((a, b) => compare(text(a), text(b)));
    } else {
      return list;
    }
  }

  // attributeUpdated(p) {
  //   // if (p.has("list")) {
  //   //   const { list, cmp, text } = this;
  //   //   if (list && list.length > 1) {
  //   //     //this.list = [...list];
  //   //     //console.warn(list, text);
  //   //   }
  //   // }
  //   // if (p.has("sort")) {
  //   //   console.warn(this.sort);
  //   //   const { list, sort } = this;
  //   //   if (list && list.length > 1 && sort) {
  //   //     //   this.list = [...list].sort(sort);
  //   //   }
  //   // }
  //   super.updated(p);
  // }

  render() {
    const { list, href, text, text2, li, reverse } = this;
    const sorted = this.sort(list, { reverse });
    return _renderOL(list, { href, text, text2, li });
  }

  // export const ol = (
  //   list,
  //   {
  //     header = "",
  //     icon = "url",
  //     href = r => `/${r["@id"]}`,
  //     text = r => r.name,
  //     sort = (a, b) => text(a).localeCompare(text(b))
  //   } = {}
  // ) => html`
  //   <ol-mdc>
  //     ${(list || []).sort(sort).map(item => _li(item, { href, text }))}
  //   </ol-mdc>
  // `;
}
customElements.define("ol-mdc", OrderedList);
