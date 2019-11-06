import { html } from "lit-element";

const buttonIcon = icon =>
  html`
    <button-icon icon=${icon}></button-icon>
  `;

export const a = (text, { href, cssclass, icon, tabindex }) => html`
  <a class="${cssclass}" href=${href} tabindex=${tabindex === 0 ? 0 : ""}>
    ${icon ? buttonIcon(icon) : ""}
    <li>${text}</li>
  </a>
`;
