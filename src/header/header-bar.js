import "@material/mwc-drawer";
import "@material/mwc-top-app-bar";
import "@material/mwc-icon-button";
import { html, LitElement } from "lit-element";

import "../button/button-icon.js";
import { style } from "./header-bar-style.js";
import { drawer } from "./drawer.js";

const sitename = "Norwegian polar data centre";

export class HeaderBar extends LitElement {
  static get styles() {
    return style;
  }

  static get properties() {
    return {
      title: { type: String },
      href: { type: String },
      drawerTitle: { type: String, attribute: "drawer-title" },
      drawerSubtitle: { type: String, attribute: "drawer-subtitle" }
    };
  }

  constructor() {
    super();
    this.title = sitename;
    this.href = "#";
    this.drawerHeading = sitename;
    this.hasHeader = () => (this.drawerHeading ? true : false);
    this.prominent = false;
  }

  async firstUpdated() {
    const drawer = this.renderRoot.querySelector("mwc-drawer");
    this.renderRoot.addEventListener("MDCTopAppBar:nav", () => {
      drawer.open = !drawer.open;
    });
  }

  render() {
    const { title, href, hasHeader, drawerTitle, drawerSubtitle } = this;
    return html`
      <mwc-drawer ?hasHeader=${hasHeader()} type="dismissible">
        <span slot="title">${drawerTitle}</span>
        <span slot="subtitle">${drawerSubtitle}</span>
        <slot name="drawer">${drawer}</slot>

        <div slot="appContent">
          <mwc-top-app-bar>
            <button-icon icon="menu" slot="navigationIcon"></button-icon>
            <span slot="title"><a id="name" href="${href}">${title}</a></span>
            <slot name="main"></slot>
          </mwc-top-app-bar>
        </div>
      </mwc-drawer>
    `;
  }
}
customElements.define("header-bar", HeaderBar);
