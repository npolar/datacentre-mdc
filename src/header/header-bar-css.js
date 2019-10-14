import { css } from "lit-element";
//import _scss from "./header-bar-scss.js";
import _shared from "../style/shared-scss.js";
import _list from "../list/list-scss.js";

// 4c5859 grayish
const _css = css`
  :host {
    /* --mdc-theme-primary: rgb(18, 79, 120);
  --mdc-theme-on-primary: var(--mdc-theme-secondary);
    --mdc-theme-secondary: #2e3535;
    --mdc-theme-on-secondary: white;
    /* --mdc-theme-on-secondary: var(--mdc-theme-secondary);
  --mdc-theme-accent: #d1480e;
  --mdc-theme-error: #b00020;
    padding: 0;
    margin: 0; */
  }

  header-bar {
  }

  a.mdc-list-item {
    color: var(--mdc-theme-accent);
  }

  /*body {
margin: 0;
font-family: Helvetica, sans-serif;
background-color: #f4f4f4;
}*/
  main {
    padding-top: 70px;
  }

  .header .menu {
    clear: both;
    max-height: 0;
    transition: max-height 0.2s ease-out;
    background-color: #2e3535;
    font-weight: 500;
    font-size: 2rem;
    color: var(--mdc-theme-on-secondary);
  }

  .footer {
    background: var(--mdc-theme-secondary);
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 400;
    letter-spacing: 0.03125em;
  }
  a.footer {
    color: gray;
  }

  .menu button-icon {
    color: lightgray;
  }

  .accent {
    color: var(--mdc-theme-accent);
  }

  /* a {
color: #000;
} */
  .header {
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.1);
    position: fixed;
    width: 100%;
    z-index: 3;
  }
  :host .logo {
    display: block;
    float: left;
    font-size: 1.6em;
    font-weight: 700;
    text-transform: uppercase;
    padding: 10px 20px;
    text-decoration: none;
  }

  .header ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
    background-color: var(--mdc-theme-secondary);
  }
  .header li a {
    display: block;
    padding: 20px 20px;
    border-right: 1px solid #f4f4f4;
    text-decoration: none;
  }
  .header li a:hover,
  .header .menu-btn:hover {
    background-color: #f4f4f4;
  }

  .header .menu-icon {
    cursor: pointer;
    display: inline-block;
    float: right;
    padding: 28px 20px;
    position: relative;
    user-select: none;
  }
  .header .menu-icon .navicon {
    background: #333;
    display: block;
    height: 2px;
    position: relative;
    transition: background 0.2s ease-out;
    width: 18px;
  }
  .header .menu-icon .navicon:before,
  .header .menu-icon .navicon:after {
    background: #333;
    content: "";
    display: block;
    height: 100%;
    position: absolute;
    transition: all 0.2s ease-out;
    width: 100%;
  }
  .header .menu-icon .navicon:before {
    top: 5px;
  }
  .header .menu-icon .navicon:after {
    top: -5px;
  }
  .header .menu-btn {
    display: none;
  }
  .header .menu-btn:checked ~ .menu {
    max-height: 768px;
  }
  .header .menu-btn:checked ~ .menu-icon .navicon {
    background: transparent;
  }
  .header .menu-btn:checked ~ .menu-icon .navicon:before {
    transform: rotate(-45deg);
  }
  .header .menu-btn:checked ~ .menu-icon .navicon:after {
    transform: rotate(45deg);
  }
  .header .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:before,
  .header .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:after {
    top: 0;
  }
  /* @media (min-width: 5000px) {
    .header li {
      float: left;
    }
    .header li a {
      padding: 20px 30px;
    }
    .header .menu {
      clear: none;
      float: right;
      max-height: none;
    }
    .header .menu-icon {
      display: none;
    }
  } */
`;
export const style = [_shared, _list, _css];
