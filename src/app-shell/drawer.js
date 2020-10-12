export const drawer = ({
  host,
  menu,
  html,
  lang,
  t,
  authenticated = false
} = {}) => html`
  <div class="switch" style="padding: 16px;">
    <a href="/" class="mdc-typography--headline5"
      >${t(`${host.localName}.site.name`)}</a
    >
  </div>
  ${authenticated
    ? html`
        <div class="mdc-drawer__header">
          <h3 class="mdc-drawer__title">Name Name</h3>
          <h6 class="mdc-drawer__subtitle">email@material.io</h6>
        </div>
      `
    : ""}

  <list-twoline
    .entries=${menu({ host, t, lang })}
    lang="${lang}"
  ></list-twoline>

  <ul class="mdc-list">
    <li class="mdc-list-item" @click=${host.toggleLang}>
      <ic-on class="mdc-list-item__graphic" role="presentation">
        language
      </ic-on>

      <span class="mdc-list-item__text">
        ${t(`lang.switch.${lang === "en" ? "no" : "en"}`)}
      </span>
    </li>
    <li class="mdc-list-item" @click=${host.toggleDrawer}>
      <ic-on class="mdc-list-item__graphic" role="presentation">
        close
      </ic-on>

      <span class="mdc-list-item__text">
        ${t("drawer.close")}
      </span>
    </li>
  </ul>
`;
