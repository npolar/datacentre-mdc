import { html } from "lit-element";

export const drawerHeading = `Norwegian Polar
Data Centre`;

export const drawerSubheading = `https://data.npolar.no`;

const buttonIcon = icon =>
  html`
    <button-icon icon=${icon}></button-icon>
  `;

export const ali = (text, { href, icon, tabindex }) => html`
  <a class="mdc-list-item" href=${href} tabindex=${tabindex === 0 ? 0 : ""}>
    ${icon ? buttonIcon(icon) : ""}
    <li>${text}</li>
  </a>
`;
export const footer = html`
  ${ali("Preferences", { href: "/preferences", icon: "settings" })}
  ${ali("Sign in", { href: "/sign-in", icon: "account_box" })}
`;

export const drawer = html`
  <nav class="mdc-typography">
    <ul class="mdc-list">
      ${ali("Dataset catalogue", {
        href: "/dataset",
        icon: false,
        tabindex: 0
      })}
      ${ali("Data APIs", {
        href: "/api"
      })}
      ${ali("Data policy", {
        href: "/about/data-policy"
      })}
      ${ali("Data publishing guides", {
        href: "/guide"
      })}
      <hr class="mdc-list-divider" />
      ${ali("Applications", {
        href: "/applications",
        icon: "apps"
      })}
      ${footer}
    </ul>
  </nav>
`;
