import { css, html, LitElement } from "lit-element";
import _ul from "./list-scss.js";
import { li } from "./li.js";

const renderEntries = (
  entries = [],
  { lang, divider = false, graphic = "avatar", twoline = false } = {}
) =>
  entries.map(
    ([primary, { icon, href, divider } = {}]) => html`
      ${li({ icon, href, primary })}
    `
  );

// const isDateTime = (dt, { html, format }) =>
//   html`
//     <time datetime="${dt}">format(dt)</time>
//   `;

export class ListIcon extends LitElement {
  static get properties() {
    return {
      entries: { type: Array },
      lang: { type: String, reflect: true },
      graphic: { type: String },
      "on-secondary": { type: Boolean },
      oneline: { type: Boolean },
      "non-interactive": { type: Boolean }
    };
  }
  static get styles() {
    return [_ul];
  }

  constructor() {
    super();
    this.entries = [];
    this.oneline = true;
    this.graphic = "avatar";
  }

  // updated(p) {
  //   const { secondary } = this;
  //   const theme = getThemeProperties(this);
  //
  //   if (p.has("on-secondary") && secondary) {
  //     console.log({ theme });
  //     const { secondary } = getThemeProperties(this);
  //     const ul = this.renderRoot.querySelector("ul");
  //     ul.style.setProperty("--mdc-theme-primary", "white"); // ic-on color
  //     ul.style.setProperty("color", ON_PRIMARY);
  //   } else {
  //     this.style.removeProperty(PRIMARY);
  //   }
  //   super.updated(p);
  // }
  render() {
    const { entries, lang, graphic, oneline } = this;
    const interactive = this["non-interactive"] === true ? false : true;

    return html`
      <ul
        class="mdc-list"
        ?noninteractive="${true === interactive}"
        lang="${lang}"
      >
        ${renderEntries(entries, { lang, graphic, oneline })}
      </ul>
    `;
  }
}
customElements.define("list-icon", ListIcon);
