// https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands
import { LitElement } from "lit-element";
import { emit } from "../host.js";
//import { userStore as store } from "../store/user-store.js";
import { isValid as isValidJWT, payload } from "@npolar/fetch-api/src/jwt.js";
import {
  authenticate,
  forceNpolarIfDomainIsMissing
} from "@npolar/fetch-api/src/v1/user/authenticate.js";
import { onetime } from "@npolar/fetch-api/src/v1/user/onetime.js";
import render from "./render.js";
import style from "./style.js";
import listStyle from "@npolar/mdc/src/list/list-scss.js";

const formatDateTime = (
  dt,
  locales = "default",
  options = {
    dateStyle: "medium",
    timeStyle: "short",
    hour12: false
  }
) => new Intl.DateTimeFormat(locales, options).format(dt);

const SIGNIN_EVENT = "@npolar/sign-in";
// const { warn, error } = console;
// const { stringify } = JSON;

export class SignIn extends LitElement {
  static get properties() {
    const reflect = true;
    return {
      email: { type: String, reflect },
      password: { type: String },
      method: { type: String },
      user: { type: Object },
      jwt: { type: String },
      statusText: { type: String },
      response: { type: Object }
    };
  }
  static get styles() {
    return [listStyle, style];
  }

  constructor() {
    super();
    this.email = localStorage.getItem("email") || "";
    this.password = "";
    this.method = "password";
    this.jwt = "";
    this.statusText = "";
    this.response = { status: 0 };
  }

  handleEvent(e) {
    const [input] = e.composedPath();
    const { name, value } = input;
    if (["email", "password"].includes(name)) {
      this[name] = value;
    }
  }

  async firstUpdated(props) {
    const form = this.renderRoot.querySelector("form");
    form.addEventListener("input", this);
    super.firstUpdated(props);
    // const jwt = await store.get("jwt");
    // const user = await store.get("user");
    // if (jwt && jwt.length) {
    //   this.jwt = jwt;
    // }
    // if (user && user.email) {
    //   this.user = user;
    //   this.email = user.email;
    // }

    // Handle sign-in via email (1-time password)
    const params = new URLSearchParams(location.search);
    if (params.has("email") && params.has("p1")) {
      this.email = params.get("email");
      this.password = params.get("p1");
      params.delete("p1");
      params.delete("email");
      this.signIn();
    }
  }

  async onetimeAction() {
    const { email } = this;
    const response = await onetime({ email });
    const o = await response.json();
    const { status, statusText } = response;
    this.response = { ...o, status, statusText };
    this.statusText = 200 === status ? "Check email to sign-in" : "";
    // @todo https://material.io/develop/web/components/snackbars/ instead of statusText for successes?
  }

  async signIn() {
    let { email, password, user, jwt } = this;
    if (!email && user && user.email) {
      email = user.email;
      this.email = email;
    }
    if (!user && email && email.length) {
      user = { email };
    }
    if (!isValidJWT(jwt)) {
      jwt = null;
    }
    const response = await authenticate({ email, password, jwt });
    const obj = await response.json();
    const { status, statusText } = response;
    this.response = { ...obj, status, statusText };
    this.statusText =
      statusText === "OK" ? "Signed in at " + new Date().toJSON() : statusText;
    if (200 === response.status) {
      const jwt = obj.token;
      if (isValidJWT(jwt)) {
        const iat = parseInt(new Date() / 1000);
        user = { iat, ...payload(jwt) };
        //store.set("user", user);
        //store.set("jwt", jwt);

        this.jwt = jwt;
        emit(this, SIGNIN_EVENT, { jwt, user });
      }
    }
  }

  async emailChanged() {
    this.email = forceNpolarIfDomainIsMissing(this.email);
  }

  render() {
    const { jwt, user, statusText } = this;
    if (statusText.length === 0 && user && user.exp && user.iat) {
      const expires = new Date(user.exp * 1000);
      const issued = new Date(user.iat * 1000);
      if (new Date() > expires) {
        this.statusText = `Session expired ${formatDateTime(expires)}`;
      } else if (jwt && jwt.length) {
        if (isValidJWT(jwt)) {
          this.statusText = `Already signed in: session expires ${formatDateTime(
            expires
          )}`;
        } else {
          this.statusText = `Last signed in ${formatDateTime(issued)}`;
        }
      }
    }
    return render(this);
  }
}
customElements.define("sign-in", SignIn);
