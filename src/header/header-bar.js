import { html, LitElement } from "lit-element";
import { style } from "./header-bar-css.js";
import { drawer } from "./drawer.js";
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

export class HeaderBar extends LitElement {
  static get styles() {
    return style;
  }

  static get properties() {
    return {
      heading: { type: String },
      href: { type: String }
      //search: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.heading = sitename;
    this.href = "/";
    this.hasHeader = () => (this.drawerHeading ? true : false);
    this.centerHeading = true;
    this.prominent = false;
    this.dense = false;
    this.search = false;
    this.logo = logo;
  }

  async firstUpdated() {
    const drawer = this.renderRoot.querySelector("mwc-drawer");
    this.renderRoot.addEventListener("MDCTopAppBar:nav", () => {
      drawer.open = !drawer.open;
    });
  }

  render() {
    const {
      heading,
      href
      //logo,
      //search,
    } = this;
    return html`
      <header class="header mdc-typography">
        <a href=${href} class="logo">
          ${heading}
        </a>
        <input class="menu-btn" type="checkbox" id="menu-btn" />

        <label class="menu-icon" for="menu-btn">
          <span class="navicon"></span>
        </label>

        ${drawer}
      </header>
    `;
  }
}
customElements.define("header-bar", HeaderBar);
// <img src="${logo}" alt="logo" height="48px" />
