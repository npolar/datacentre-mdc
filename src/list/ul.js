import { html } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined.js";

export const li = (c, { href, text, tabIndex }) => html`
  <li
    class="mdc-list-item"
    tabindex=${ifDefined(tabIndex === 0 ? 0 : undefined)}
  >
    <a href="case/${c["@id"]}">${c.title}</a>
  </li>
`;

export const ul = (data, { href, text } = {}) => {
  let i = 0;
  return html`
    <ul class="mdc-list">
      ${(data || []).map(o => li(o, { href, text, tabIndex: i++ }))}
    </ul>
  `;
};

export const h1 = (text, { n = 2 } = {}) => `
  <h1 class="mdc-typography--headline${n}">${text}</h1>
`;
