import { css } from "lit-element";
import shared from "../../style/shared-scss.js";

export default [
  shared,
  css`
    :host {
      --nav-bar-background: var(--mdc-theme-primary);
      --nav-bar-color: var(--mdc-theme-on-primary);
      --nav-open-background: var(--mdc-theme-secondary);
      --nav-open-color: var(--mdc-theme-on-secondary);
    }

    a {
      text-decoration: none;
      color: var(--nav-bar-color);
    }

    button-icon-toggle {
      color: var(--nav-bar-color);
    }

    #heading,
    ::slotted([slot="heading"]) {
      margin: 0 0 0 2.25rem;
      font-size: var(--nav-bar-font-size, 1.25rem);
      font-weight: 600;
      white-space: nowrap;
      color: var(--nav-bar-color);
    }

    :host[fixed] {
      width: 100%;
      position: -webkit-sticky; /* Safari */
      position: sticky;
      top: 0;
      background: var(--nav-bar-background);
    }

    .nav-wrapper {
      background: var(--nav-bar-background);
    }

    .navbar {
      display: grid;
      grid-template-columns: 70px 1fr 3fr;
      align-items: center;
      height: 50px;
      overflow: hidden;
    }

    .navbar img {
      height: 36px;
      width: auto;
      justify-self: start;
      margin-left: 20px;
    }

    .navbar ul,
    li {
      justify-self: end;
      display: inline;
      list-style: none;
      padding-right: 16px;
    }

    .nav-item a {
      font-weight: 400;
      text-decoration: none;
      transition: color 0.3s ease-out;
      color: var(--nav-bar-color);
    }

    /* .nav-item a:hover {
      color: #3498db;
    } */

    /* MOBILE MENU & ANIMATION */

    .menu-toggle .bar {
      width: 0px;
      height: 0px;
      background-color: #3f3f3f;
      margin: 5px auto;
      -webkit-transition: all 0.3s ease-in-out;
      -o-transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-in-out;
    }

    .menu-toggle {
      justify-self: end;
      display: var("--nav-bar-nav-icon-display", none);
    }

    .menu-toggle:hover {
      cursor: pointer;
    }

    /* Media Queries */

    @media only screen and (max-width: 980px) {
      /* Push content down (but only when mobile nav icon is visible...) */
      .push {
        width: 100%;
        height: calc(100vh-55px);
        min-height: calc(100vh - 55px);
        background-size: cover;
        display: flex;
        flex-direction: column;
        justify-content: center;
        z-index: 1e6;
      }

      #nav > * {
        background: var(--nav-open-background);
      }

      ul.mobile-nav a {
        color: var(--nav-open-color);
      }

      /* Mobile nav*/

      .navbar ul {
        display: flex;
        flex-direction: column;
        position: fixed;
        justify-content: start;
        top: 50px;
        width: 100%;
        height: calc(100vh - 55px);
        transform: translate(-101%);
        overflow: hidden;
        margin-block-start: 0em;
        margin-block-end: 0em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 16px;
      }

      .navbar li {
        padding: 24px;
      }

      .navbar li:first-child {
        margin-top: 50px;
      }

      .navbar li a {
        font-size: 1.25rem;
        font-weight: 500;
      }

      .menu-toggle {
        display: block;
      }

      .mobile-nav {
        transform: translate(0%) !important;
      }
    }
  `
];
