// Not needed atm: import { MDCTopAppBar } from "@material/top-app-bar";
import { LitElement, html } from "lit-element";

import { emit } from "../host/event.js";

import style from "./style.js";
import _scss from "./app-bar-scss.js";

import "../button/exports.js";

export class AppBar extends LitElement {
  static get properties() {
    const reflect = true;
    return {
      heading: { type: String },
      path: { type: String },
      href: { type: String },
      open: { type: Boolean, reflect }
    };
  }

  static get styles() {
    return [_scss, style];
  }

  constructor() {
    super();
    this.fixed = false;
    this.open = false;
    this.path = "/";
    this.href = "/";
  }

  menuClicked() {
    this.open = !this.open;
    const { open } = this;
    const detail = { open };
    emit({ host: this, name: "@npolar/app-bar", detail });
  }

  showNavIcon() {
    const url = new URL(window.location);
    const q = url.searchParams.get("q");
    if ("/" === url.pathname && !q) {
      return false;
    }
    //${ path && path.length > 1
    return true;
  }

  navIcon() {
    const { href } = this;

    return this.showNavIcon()
      ? html`
          <a href="${href}">
            <button-icon
              icon="arrow_back"
              class="mdc-top-app-bar__navigation-icon"
            >
            </button-icon>
          </a>
        `
      : "";
  }

  render() {
    const { open, heading } = this;

    return html`
      <header class="mdc-top-app-bar mdc-top-app-bar--fixed">
        <div class="mdc-top-app-bar__row">
          <section
            class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start"
          >
            ${this.navIcon()}
            <span class="mdc-top-app-bar__title">
              ${heading}
            </span>
          </section>

          <section
            class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end"
          >
            <button-icon-toggle
              icon="menu"
              icon-toggle="close"
              ?on=${!open}
            ></button-icon-toggle>
          </section>
        </div>
      </header>
    `;
  }
}
