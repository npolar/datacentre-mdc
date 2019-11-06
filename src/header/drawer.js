import { html } from "lit-element";
import { a } from "../list/li.js";
const cssclass = "mdc-list-item";
const icon = "subdirectory_arrow_right";

export const footer = html`
  ${a("Apps", {
    href: "/applications",
    icon: "apps",
    cssclass: `${cssclass} footer`
  })}
  ${a("Preferences", {
    href: "/preferences",
    icon: "settings",
    cssclass: `${cssclass} footer`
  })}
  ${a("Sign in", {
    href: "/sign-in",
    icon: "account_box",
    cssclass: `${cssclass} footer`
  })}
`;

export const drawer = html`
  <ul class="menu mdc-list">
    ${a("Data catalogue", {
      href: "/dataset",
      icon: "home",
      tabindex: 0,
      cssclass
    })}
    ${a("Machine-readable data", {
      href: "/api",
      icon,
      cssclass
    })}
    ${a("Publish data", {
      href: "/publish",
      icon,
      cssclass
    })}
    <hr class="mdc-list-divider" />
    <span class="footer">
      ${footer}
    </span>
  </ul>
`;
