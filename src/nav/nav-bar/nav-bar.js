import { html, LitElement } from "lit-element";
import css from "./nav-bar-css.js";
import "../../button/exports.js";
import "../../input/exports.js";

import { emit } from "../../host.js";

const sitename = `Norwegian Polar Data Centre`;
const logo = ({ dark }) =>
  dark === true
    ? "/@npolar/mdc/npolar/logo/norsk-polarinstitutt-logo-norsk-hvit.png"
    : "/@npolar/mdc/npolar/logo/norsk-polarinstitutt-logo-norsk.png";

// Responsive navigation, based on https://codepen.io/bowersrd/pen/dwXLba
export class NavBar extends LitElement {
  static get styles() {
    return css;
  }

  static get properties() {
    const reflect = true;
    return {
      heading: { type: String },
      href: { type: String },
      fixed: { type: Boolean, reflect },
      dark: { type: Boolean, reflect },
      open: { type: Boolean, reflect },
      links: { type: Array },
      logo: { type: Function }
    };
  }

  constructor() {
    super();
    this.heading = sitename;
    this.href = "/";
    this.logo = logo;
    this.open = false;
    this.shadow = false;
    this.dark = false;
  }

  toggleMenu() {
    this.open = !this.open;
    const { open } = this;
    this.renderRoot.querySelector(".nav").classList.toggle("is-active");
    this.renderRoot.querySelector(".nav").classList.toggle("mobile-nav");
    emit(this, "@npolar/nav-bar", { open });
  }

  navItemClicked(e) {
    this.open = true;
    this.toggleMenu();
    const a = e.target;
    const { id } = a.dataset;
    emit(a, "@npolar/nav-menu", { id });
  }

  render() {
    const {
      heading,
      href,
      links,
      dark,
      open,
      logo,
      toggleMenu,
      navItemClicked
    } = this;

    return html`
      <div class="nav-wrapper mdc-typography">
        <nav class="navbar">
          <slot id="logo" name="logo">
            <a href=${href}>
              <img src="${logo({ dark })}" alt="logo" />
            </a>
          </slot>

          <slot id="heading" name="heading">
            <a href="${href}">${heading}</a>
          </slot>

          <slot id="nav" name="nav">
            <ul class="nav">
              ${(links || []).map(
                ({ id, text, href }) =>
                  html`
                    <li class="${open ? "" : "nav-item"}">
                      <a href=${href} data-id=${id} @click=${navItemClicked}
                        >${text}</a
                      >
                    </li>
                  `
              )}
            </ul>
          </slot>

          <slot name="nav-icon" class="menu-toggle" id="_mobile-menu">
            <button-icon-toggle
              @click=${toggleMenu}
              ?on=${!open}
              icon="menu"
              icon-toggle="close"
            ></button-icon-toggle>
          </slot>
        </nav>
      </div>
      <section id="push" class="${open ? "push" : ""}"></section>
    `;
  }
}
customElements.define("nav-bar", NavBar);
