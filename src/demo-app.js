import { AppShellMixin } from "./app-shell/exports.js";
import { LitElement, html } from "lit-element";
import { get as translator } from "lit-translate";

const routes = [];

import "./card/exports.js";
import "./button/exports.js";
import "./input/exports.js";

export class DemoApp extends AppShellMixin({
  superclass: LitElement,
  html,
  translator,
  routes
}) {
  render() {
    return html`
      <card-mdc>
        <div slot="secondary">
          <select-enum
            name="area"
            label="area"
            value="Dronning Maud Land"
            enum='["", "Svalbard", "Jan Mayen", "Bouvetøya", "Peter I Øy", "Dronning Maud Land"]'
          >
          </select-enum>
        </div>
      </card-mdc>

      <section>
        <!--<div>
          <input-mdc
            fullwidth
            name="fullwidth"
            helper="Helper text"
            placeholder="fullwidth"
          ></input-mdc>
        </div>-->
        <div>
          <input-mdc autofocus label="input-mdc[autofocus]"></input-mdc>
          <input-search name="search" label="input-search"></input-search>
          <input-password
            label="input-password"
            name="password"
          ></input-password>
          <input-lock label="input-lock"></input-lock>
        </div>
      </section>

      <section>
        <div>
          <button-mdc>button-mdc</button-mdc>
          <button-mdc outlined>outlined</button-mdc>
          <button-mdc raised>raised</button-mdc>
          <button-mdc id="dark-light" class="_2ndary" raised
            >secondary
          </button-mdc>
        </div>
        <div>
          <button-mdc icon="cloud" label="cloud"></button-mdc>
          <button-mdc icon="cloud" label="outlined" outlined></button-mdc>
          <button-mdc icon="cloud" label="raised"></button-mdc>
          <button-mdc
            icon="error"
            class="danger"
            label="dangerous"
            raised
            outlined
          ></button-mdc>
        </div>
        <div>
          <button-icon-toggle
            on
            icon="menu"
            icon-toggle="close"
          ></button-icon-toggle>
          <button-icon class="danger" icon="warning"></button-icon>
        </div>
        <div>
          <button-fab icon="edit"></button-fab>
          <button-fab icon="add" mini></button-fab>
          <button-fab icon="cloud" extended label="Upload"></button-fab>
          <button-fab icon="share" class="black-on-white"></button-fab>
        </div>
      </section>
    `;
  }
}
customElements.define("demo-app", DemoApp);
