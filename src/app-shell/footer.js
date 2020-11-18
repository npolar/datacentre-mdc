import { whiteLogo } from "./npolar-logo.js";
export const footer = ({ host, html, lang, t }) => html`
  <div class="name-logo-grid switch">
    <a href="/" class="mdc-typography--headline4"
      >${t(`${host.localName}.site.name`)}</a
    >

    <div class="mdc-typography--headline5">
      ${t(`${host.localName}.site.slogun`)}
    </div>

    ${whiteLogo({ html, lang, t })}
  </div>
`;
