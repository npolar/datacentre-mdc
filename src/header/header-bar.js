import { html, LitElement } from "lit-element";
import { style } from "./header-bar-css.js";
import { drawer } from "./drawer.js";

import "../input/input-search.js";
const sitename = `Norwegian Polar Data Centre`;

const logo = "/@npolar/mdc/logo/norsk-polarinstitutt-logo-norsk.png";
// const headingHTML = ({ heading, href }) => {
//   return html`
//     <a id="name" href="${href}">${heading}</a>
//   `;
// };
// const searchHTML = ({ heading, href }) => {
//   return html`
//     <input type="text" class="search" .value=${heading} />
//   `;
// };
// const titleSlot = ({ searching, ...arg }) => {
//   return searching ? heading(arg) : heading(arg);
// };

// A header bar with pure CSS menu, thanks to: https://codepen.io/mutedblues/pen/MmPNPG
// const inputSearch = ({ label = "Search", placeholder = label } = {}) =>
//   html`
//     <input-mdc id="q" placeholder=${placeholder} label=${label} />
//   `;
// const aHeading = ({ text = "text", href = "" } = {}) =>
//   html`
//     <a href=${href}>${text}</a>
//   `;

export class HeaderBar extends LitElement {
  static get styles() {
    return style;
  }

  static get properties() {
    const reflect = true;
    return {
      heading: { type: String, reflect },
      icon: { type: String, reflect },
      href: { type: String, reflect },
      search: { type: Boolean, reflect },
      dark: { type: Boolean, reflect }
    };
  }

  constructor() {
    super();
    this.heading = sitename;
    this.href = "/";
    this.search = false;
    this.logo = logo;
  }

  toggle(e) {
    e.preventDefault();
    const { toggle } = e.target.dataset;
    if ([true, false].includes(this[toggle])) {
      this[toggle] = !this[toggle];
    }
  }

  render() {
    const { heading, href } = this;
    return html`
      <header class="header mdc-typography">
        <slot name="left" class="header left">
          <a href=${href}>${heading}</a>
        </slot>

        <slot name="menu">
          <input class="menu-btn" type="checkbox" id="menu-btn" />
          <label class="menu-icon" for="menu-btn">
            <span class="navicon"></span>
          </label>
          ${drawer}
        </slot>
      </header>
    `;
  }
}
customElements.define("header-bar", HeaderBar);
