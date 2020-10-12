import "../ic-on/ic-on.js";
import { html } from "lit-element";
export const li = ({ icon, href, primary }) => html`
  <li class="mdc-list-item">
    <ic-on class="mdc-list-item__graphic" role="presentation">
      ${icon}
    </ic-on>
    ${href
      ? html`
          <a class="mdc-list-item__text" href="${href || "#"}">
            ${primary}
          </a>
        `
      : html`
          <div class="mdc-list-item__text" href="${href || "#"}">
            ${primary}
          </div>
        `}
    <!-- <span class="mdc-list-item__meta">
      <ic-on class="show-on-hover">
        more_vert
      </ic-on>
    </span> -->
  </li>
`;
