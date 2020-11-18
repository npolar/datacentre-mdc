import { html, LitElement } from "lit-element";
import styles from "./ic-on-scss.js";

export class IcOn extends LitElement {
  static get properties() {
    return {
      icon: { type: String }
    };
  }
  static get styles() {
    return styles;
  }
  updated(p) {
    super.updated(p);
    this.style.setProperty("color", "var(--mdc-theme-primary)");
  }
  render() {
    const { icon } = this;
    return html`
      <slot>${icon || ""}</slot>
    `;
  }
}
customElements.define("ic-on", IcOn);
