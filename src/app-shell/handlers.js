import { emit, addListeners } from "../host/event.js";
import { primary, secondary as offline } from "../style/color.js";

const LIT_TRANSLATE_LANG_CHANGED = "langChanged";
const { stringify } = JSON;

// currentTarget: always refers to the element to which the event handler has been attached
// https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
const windowHandlerMap = ({ host, window }) =>
  new Map([
    // On navigation: Scroll to top and flush html title
    [
      "popstate",
      ({ currentTarget }) => {
        currentTarget.scroll({ top: 0, left: 0, behavior: "smooth" });
        currentTarget.document.querySelector("title").textContent = "";
      }
    ],
    [
      "offline",
      ({ target, currentTarget }) => {
        console.warn("offline", { target, currentTarget });
        host.offline = true;
        host.style.setProperty("--mdc-theme-primary", offline);
      }
    ],
    [
      "online",
      () => {
        host.offline = false;
        host.style.setProperty("--mdc-theme-primary", primary);
      }
    ],
    [
      "@npolar/app-bar",
      ({ detail: { heading, endpoint, path, lang } }) => {
        host.heading = heading;
        host.lang = lang;
        host.endpoint = endpoint;
        host.path = path;
      }
    ],
    [
      ("@npolar/sign-in",
      ({ detail: { jwt, user } }) => {
        host.authenticated = true;
        host.user = user;
      })
    ],
    [
      ("@npolar/sign-out",
      () => {
        host.authenticated = false;
        delete host.user;
      })
    ],
    [
      LIT_TRANSLATE_LANG_CHANGED, //re-emit lit-translate lang changed
      ({ detail: { lang } }) =>
        emit({ host, name: "@npolar/lang", detail: { lang } })
    ],
    [
      "@npolar/lang",
      async ({ detail: { lang } }) => {
        window.document.querySelector("html").lang = lang;

        const { heading } = host;
        if (lang && host.lang !== lang) {
          await host.changeLang(lang);
          host.lang = lang;
          //@todo app-shell: Find a clever way to update top-app-bar on lang change
          //host.heading.requestUpdate(); // = host.translator("site.heading");
        }
      }
    ],
    [
      "@npolar/title",
      ({ detail: { title, lang, ld } }) => {
        if (title) {
          window.document.querySelector("title").textContent = title;
        }

        const ldscript = window.document.querySelector(
          `script[type="application/ld+json"]`
        );
        if (ldscript) {
          ldscript.textContent = stringify(ld || "");
        }
      }
    ]
  ]);

export const addWindowListeners = ({
  window,
  host,
  handlers = windowHandlerMap({ host, window })
} = {}) => {
  addListeners({ host, attachTo: window, handlers });
  //window.addEventListener("@npolar/sign-in", handler.get("@npolar/sign-in"));

  // window.addEventListener("@npolar/sign-out", ({ detail: { jwt, user } }) => {
  //   console.debug("@npolar/sign-out", { jwt, user });
  //   host.authenticated = false;
  //   //@todo Signal sign out
  // });

  // Re-emit lit-translate lang change as @npolar/lang
  // window.addEventListener(LIT_TRANSLATE_LANG_CHANGED, ({ detail: { lang } }) =>
  //   emit(host, "@npolar/lang", { lang })
  // );

  // "The languagechange event is fired at the global scope object when the user's preferred language changes."
  // window.addEventListener("languagechange", e => {
  //   const {
  //     navigator: { language }
  //   } = window;
  //   const norwegian = ["nn", "no", "nb"];
  //   let lang = language.substring(0, 2);
  //   if (norwegian.includes(lang)) {
  //     lang = "nn";
  //   }
  //   emit(host, "@npolar/lang", { lang });
  // });
};
