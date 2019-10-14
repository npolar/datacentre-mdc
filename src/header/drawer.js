import { html } from "lit-element";

const cssclass = "mdc-list-item";

const buttonIcon = icon =>
  html`
    <button-icon icon=${icon}></button-icon>
  `;

export const ali = (text, { href, cssclass, icon, tabindex }) => html`
  <a class="${cssclass}" href=${href} tabindex=${tabindex === 0 ? 0 : ""}>
    ${icon ? buttonIcon(icon) : ""}
    <li>${text}</li>
  </a>
`;
export const footer = html`
  ${ali("Applications", {
    href: "/applications",
    icon: "apps",
    cssclass: `${cssclass} footer`
  })}
  ${ali("Preferences", {
    href: "/preferences",
    icon: "settings",
    cssclass: `${cssclass} footer`
  })}
  ${ali("Sign in", {
    href: "/sign-in",
    icon: "account_box",
    cssclass: `${cssclass} footer`
  })}
`;

export const drawer = html`
  <ul class="menu mdc-list">
    ${ali("Dataset catalogue", {
      href: "/dataset",
      icon: false,
      tabindex: 0,
      cssclass
    })}
    ${ali("Data APIs", {
      href: "/api",
      cssclass
    })}
    ${ali("Data policy", {
      href: "/about/data-policy",
      cssclass
    })}
    ${ali("Data publishing guides", {
      href: "/guide",
      cssclass
    })}
    <hr class="mdc-list-divider" />
    <span class="footer">
      ${footer}
    </span>
  </ul>
  <nav></nav>
`;
