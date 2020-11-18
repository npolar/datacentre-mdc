import "../ic-on/ic-on.js";

const toggleMenuOpen = e => {
  const menu = e.currentTarget.nextElementSibling.querySelector("#menu");
  const { open } = menu;
  menu.open = !open;
};

export const li2 = ({
  icon,
  href,
  primary,
  secondary,
  menu,
  html
} = {}) => html`
  <li class="mdc-list-item">
    <ic-on class="mdc-list-item__graphic" role="presentation">
      ${icon}
    </ic-on>
    ${href
      ? html`
          <a class="mdc-list-item__text" href="${href || "#"}">
            <span class="mdc-list-item__primary-text">${primary}</span>
            <span class="mdc-list-item__secondary-text">${secondary}</span>
          </a>
        `
      : html`
          <div class="mdc-list-item__text" href="${href || "#"}">
            <span class="mdc-list-item__primary-text">${primary}</span>
            <span class="mdc-list-item__secondary-text">${secondary}</span>
          </div>
        `}
    ${menu && menu.length > 0
      ? html`
          <span class="mdc-list-item__meta">
            <ic-on class="show-on-hover" @click="${toggleMenuOpen}">
              more_vert
            </ic-on>
            <div>
              <mwc-menu id="menu">
                ${menu.map(
                  ([text, handler]) =>
                    html`
                      <mwc-list-item @click="${handler}">${text}</mwc-list-item>
                    `
                )}
              </mwc-menu>
            </div>
          </span>
        `
      : ""}
  </li>
`;
