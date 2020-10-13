import { html, LitElement } from "lit-element";
import _ul from "./list-scss.js";
import { li2 } from "./li-twoline.js";

// import { registerTranslateConfig, get } from "lit-translate";
//
// registerTranslateConfig({
//   lookup: (key, config) => (config.strings != null ? config.strings[key] : key),
//   empty: key => key,
//   loader: lang => {
//     switch (lang) {
//       case "da":
//         return {
//           "The page is being loaded...": "Siden indlæses..."
//         };
//     }
//   }
// });

const renderEntries = (
  entries = [],
  { lang, graphic = "avatar", twoline = false } = {}
) =>
  entries.map(
    ([
      primary,
      secondary,
      { icon, href, divider = false, menu = false } = {}
    ]) => html`
      <!-- <li role="separator" class="mdc-list-divider"></li> -->
      ${li2({ html, icon, href, primary, secondary, menu })}
    `
  );

export class ListTwoline extends LitElement {
  static get properties() {
    return {
      entries: { type: Array },
      lang: { type: String, reflect: true },
      graphic: { type: String },
      "on-secondary": { type: Boolean },
      twoline: { type: Boolean },
      "non-interactive": { type: Boolean }
    };
  }
  static get styles() {
    return [_ul];
  }

  constructor() {
    super();
    this.entries = [];
    this.twoline = true;
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
    const { entries, lang, graphic, twoline } = this;
    const interactive = this["non-interactive"] === true ? false : true;

    return html`
      <ul
        class="mdc-list mdc-list--two-line"
        ?noninteractive="${true === interactive}"
        lang="${lang}"
      >
        ${renderEntries(entries, { lang, graphic, twoline })}
      </ul>
    `;
  }
}
customElements.define("list-twoline", ListTwoline);
