import { html as h } from "lit-element";

//import { linearProgress } from "@npolar/m-html/src/progress/linear-progress.js";
//import { translate as t } from "./translate.js";
const translate = (s, lang = "en") => `${lang !== "en" ? "" : ""}${s}`; //  { user, lang = getLang(user) } = {}
const t = translate;
//import anonymousAvatar from "./account_box_svg.js"; //html/src/icon/svg/,,,

export default host => {
  const {
    email,
    emailChanged,
    method,
    password,
    lang,
    signIn,
    onetimeAction,
  } = host;

  // <span ?hidden="${!user || !user.name}">${anonymousAvatar}</span>

  return h`

  <section>
    <input-mdc name=email .value=${email} @blur=${emailChanged} type=text label=${t(
    "email"
  )} required minlength="3" autocomplete="username" pattern="^.+@.+\..+$">
      </input-mdc>

    <div ?hidden=${method !== "password"}>
      <input-password name="password" .value=${password} type="password" label=${t(
    "password"
  )} placeholder="password [norwegian polar data centre]" minlength="8" autocomplete="current-password">
    </input-password>

      <button-mdc @click=${signIn} outlined raised><span class="button-mdc__label">${t(
    "sign in",
    lang
  )}</span></button-mdc>
    </div>

    <div ?hidden=${method !== "email"}>
      <button-mdc outlined raised @click=${onetimeAction}} outlined>
        <span class="button-mdc__label">${t("sign in with email", lang)}</span>
      </button-mdc>
    </div>

  </section>

  <ul class="mdc-list">
    <li class="mdc-list-item ${
      method === "password" ? "mdc-list-item--activated" : ""
    }" tabindex="0" @click="${() => (host.method = "password")}">
    <span class="mdc-list-item__graphic material-icons"><mwc-icon>security</mwc-icon></span>
      <span class="mdc-list-item__text">Password</span>
    </li>
    <li class="mdc-list-item ${
      method === "email" ? "mdc-list-item--activated" : ""
    }" @click="${() => (host.method = "email")}">
      <span class="mdc-list-item__graphic material-icons"><mwc-icon>mail</mwc-icon></span>
      <span>Email</span>
    </li>
  </ul>


`;
};
