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
      heading: { type: String },
      href: { type: String },
      prominent: { type: Boolean },
      drawerHeading: { type: String, attribute: "drawer-heading" },
      drawerSubheading: { type: String, attribute: "drawer-subheading" }
    };
  }

  constructor() {
    super();
    this.heading = sitename;
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
    const {
      heading,
      href,
      prominent,
      hasHeader,
      drawerHeading,
      drawerSubheading
    } = this;
    return html`
      <mwc-drawer ?hasHeader=${hasHeader()} type="dismissible">
        <span id="drawer-title" slot="title">
          ${drawerHeading}
        </span>
        <span id="drawer-subtitle" slot="subtitle">${drawerSubheading}</span>

        <slot name="drawer">${drawer}</slot>

        <div slot="appContent" class="mdc-typography">
          <mwc-top-app-bar ?prominent=${prominent}>
            <button-icon icon="menu" slot="navigationIcon"></button-icon>
            <span slot="title">
              <a id="name" href="${href}">${heading}</a>
            </span>
            <slot name="main"></slot>
          </mwc-top-app-bar>
        </div>
      </mwc-drawer>
    `;
  }
}
customElements.define("header-bar", HeaderBar);
