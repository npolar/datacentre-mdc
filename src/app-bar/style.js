import { css } from "lit-element";

export default [
  css`
    :host {
      margin: 0;
      padding: 0;
    }
    :host [icon] {
      color: var(--mdc-theme-on-primary);
    }

    :host a {
      color: var(--mdc-theme-on-primary);
    }
  `
];
