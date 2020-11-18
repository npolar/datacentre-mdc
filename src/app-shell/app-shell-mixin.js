// events
import { addWindowListeners } from "./handlers.js";

// routing
import { setRoutes } from "./set-routes.js";

// html templates
import { footer } from "./footer.js";
import { drawer } from "./drawer.js";

// styles
import _style from "./style.js";
import _app_bar from "../app-bar/app-bar-scss.js";
import _list from "../list/list-scss.js";

import { MDCTopAppBar } from "@material/top-app-bar";
import { MDCDrawer } from "@material/drawer";

// side-effects (define custom elements)
import "../button/exports.js";
import "../signed-in/signed-in.js";
import "../fetch-error/fetch-error.js";
import "../fetch-ok/fetch-ok.js";

const _drawer = Symbol();

const iconHref = [
  ["search", "/"],
  ["link", "/api/v1"],
  ["apps", "/apps"]
  //["add_box", "/new"],
  //["offline_bolt", "/apps"]
];

export const defaultMenu = ({ host, t }) =>
  iconHref.map(([icon, href]) => [t(`drawer.${icon}`), { icon, href }]);

// A ready-made app-shell mixin built with @npolar/mdc components
// Expect Mixes in lit-html, Vaadin router routes, translations, and user/auth persistence
//
// Use like:
//
// export class MyApp extends AppMixin({
//   superclass: LitElement,
//   html,
//   translator,
//   changeLang,
//   lang,
//   routes
// }) {}
export const AppShellMixin = ({
  superclass,
  html,
  translator = () => {},
  changeLang = () => {},
  lang,
  routes,
  menu = defaultMenu
} = {}) =>
  class extends superclass {
    static get properties() {
      const reflect = true;
      return {
        heading: { type: String },
        href: { type: String },
        lang: { type: String, reflect },
        authenticated: { type: Boolean, reflect },
        offline: { type: Boolean, reflect }
      };
    }
    static get styles() {
      return [_app_bar, _list, _style];
    }

    async connectedCallback() {
      //  Set language and load ranslation dictionary for mixed-in default language
      this.lang = lang;
      await changeLang(lang);

      // @todo app-shell-mixin //isAuthenticated().then(status => (this.authenticated = status));
      this.changeLang = changeLang;
      this.translator = translator;
      this.menu = menu;
      if (window) {
        addWindowListeners({ window, host: this });
      }
      super.connectedCallback();
    }

    firstUpdated() {
      super.firstUpdated();
      this.heading = translator(`${this.localName}.heading`);
      this.initRouting(routes);
      this.initDarwer(_drawer);
    }

    initRouting(routes, outlet = this.outlet()) {
      if (outlet && routes && routes.length) {
        setRoutes({ outlet, routes });
      }
    }

    initDrawer(_drawer) {
      this.this[_drawer] = MDCDrawer.attachTo(
        this.renderRoot.querySelector(".mdc-drawer")
      );

      const drawerEl = this.renderRoot.querySelector(".mdc-drawer");
      this[_drawer] = new MDCDrawer.attachTo(drawerEl);

      const topAppBarEl = this.renderRoot.querySelector(".mdc-top-app-bar");
      const topAppBar = new MDCTopAppBar.attachTo(topAppBarEl);

      topAppBar.setScrollTarget(this.renderRoot.querySelector(".main-content"));
      topAppBar.listen("MDCTopAppBar:nav", () => {
        this[_drawer].open = !this[_drawer].open;
      });
    }

    header() {
      const { heading, href, headingClicked } = this;
      return html`
        <header class="mdc-top-app-bar mdc-top-app-bar--fixed">
          <div class="mdc-top-app-bar__row">
            <section
              class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start"
            >
              ${this.navIcon()}
              <a
                href="${href}"
                @click="${headingClicked}"
                class="primary-bg mdc-top-app-bar__title"
              >
                ${heading}
              </a>
            </section>
            <section
              class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end"
            >
              ${this.headerRight()}
            </section>
          </div>
        </header>
      `;
    }

    headingClicked() {}

    navIcon() {
      return this.showNavIcon()
        ? html`
            <button-icon
              icon="arrow_back"
              class="mdc-top-app-bar__navigation-icon"
              @click=${this.navIconClicked}
            >
            </button-icon>
          `
        : "";
    }

    showNavIcon() {
      return false;
    }

    headerRight() {
      return html`
        <button-icon
          class="mdc-top-app-bar__navigation-icon"
          icon="menu"
        ></button-icon>
      `;
    }

    drawer() {
      return drawer({
        host: this,
        menu: this.menu,
        html,
        lang: this.lang,
        t: translator,
        authenticated: this.authenticated
      });
    }

    footer() {
      return footer({ host: this, html, lang: this.lang, t: translator });
    }

    outlet() {
      return this.renderRoot.querySelector("main");
    }

    toggleDrawer() {
      this[_drawer].open = !this[_drawer].open;
    }

    // Propagate properties down to the current (routed) element
    updated(p) {
      super.updated(p);

      const current = this.outlet().firstElementChild;
      if (p.has("lang")) {
        const { lang } = this;
        current.lang = lang;
      }
      if (p.has("offline")) {
        const { offline } = this;
        current.offline = offline;
      }
      if (p.has("authenticated")) {
        const { authenticated } = this;
        current.authenticated = authenticated;
      }
    }

    beforeMain() {
      return html`
        <aside class="mdc-drawer mdc-drawer--dismissible">
          <nav class="mdc-drawer__drawer">
            <span class="mdc-drawer__content">${this.drawer()}</span>
          </nav>
        </aside>
      `;
    }
    afterMain() {}

    messages() {
      return html`
        <signed-in></signed-in>
        <fetch-ok></fetch-ok>
        <fetch-error />
        <snack-ok />
        <snack-error />
      `;
    }
    render() {
      return html`
        ${this.header()}

        <div class="app-drawer-layout mdc-top-app-bar--fixed-adjust">
          ${this.beforeMain()} ${this.messages()}

          <main class="mdc-drawer-app-content main-content"></main>
          ${this.afterMain()}
        </div>

        ${this.footer()}
      `;
    }
  };
