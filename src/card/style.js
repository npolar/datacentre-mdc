import { css } from "lit-element";
import _cardStyle from "./card-scss.js";
// .card-header
// margin: 1.25rem 0;
// padding: 16px;

export default [
  _cardStyle,
  css`
    :host {
      grid-gap: 4px;
    }

    a {
      color: var(--mdc-theme-primary);
    }

    :host h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      display: flex;
      align-items: center;
      margin: 0;
    }
    .card-icon {
      padding-right: 8px;
    }

    .card-header,
    .card-main {
      padding: 12px;
    }

    /* .mdc-card__actions:hover {
      display: none;
    } */

    /* .mdc-card__actions {
      display: none;
    } */

    /* .mdc-card:hover + .mdc-card__actions {
      display: block;
    } */
  `
];
