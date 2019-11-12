import "./nav/exports.js";
import "./button/exports.js";
import "./input/exports.js";
import "./select/exports.js";

const toggleCSSProperties = (host, p0, p1) => {
  const c0 = getComputedStyle(host).getPropertyValue(p0);
  const c1 = getComputedStyle(host).getPropertyValue(p1);
  host.style.setProperty(p0, c1);
  host.style.setProperty(p1, c0);
};

const getCSSProperty = (host, p) => getComputedStyle(host).getPropertyValue(p);

export const demo = () => {
  const headerBar = document.querySelector("nav-bar");
  headerBar.addEventListener("@npolar/nav-bar", e => {
    const { open } = e.detail;
    headerBar.heading = `nav-bar[open=${open}]`;
  });
  headerBar.addEventListener("@npolar/nav-menu", e => {
    const [a] = e.composedPath();
    const { id } = a.dataset;

    const primary = getCSSProperty(headerBar, "--mdc-theme-primary");
    const onPrimary = getCSSProperty(headerBar, "--mdc-theme-on-primary");
    const secondary = getCSSProperty(headerBar, "--mdc-theme-secondary");
    const onSecondary = getCSSProperty(headerBar, "--mdc-theme-on-secondary");

    if (/invert/.test(id)) {
      headerBar.dark = !headerBar.dark;
      toggleCSSProperties(headerBar, "--nav-bar-color", "--nav-bar-background");
      toggleCSSProperties(
        headerBar,
        "--nav-open-color",
        "--nav-open-background"
      );
    } else if (/primary/.test(id)) {
      headerBar.dark = true;
      headerBar.style.setProperty("--nav-bar-color", onPrimary);
      headerBar.style.setProperty("--nav-bar-background", primary);
      headerBar.style.setProperty("--nav-open-color", onSecondary);
      headerBar.style.setProperty("--nav-open-background", secondary);
    } else if (/secondary/.test(id)) {
      headerBar.dark = true;
      headerBar.style.setProperty("--nav-bar-color", onSecondary);
      headerBar.style.setProperty("--nav-bar-background", secondary);
      headerBar.style.setProperty("--nav-open-color", onPrimary);
      headerBar.style.setProperty("--nav-open-background", primary);
    } else if (/dark/.test(id)) {
      headerBar.dark = true;
      headerBar.style.setProperty("--nav-bar-color", onSecondary);
      headerBar.style.setProperty("--nav-bar-background", secondary);
      headerBar.style.setProperty("--nav-open-color", onSecondary);
      headerBar.style.setProperty("--nav-open-background", secondary);
    } else if (/light/.test(id)) {
      headerBar.dark = false;
      headerBar.style.setProperty("--nav-bar-color", primary);
      headerBar.style.setProperty("--nav-bar-background", onPrimary);
      headerBar.style.setProperty("--nav-open-color", primary);
      headerBar.style.setProperty("--nav-open-background", onPrimary);
    }
  });

  document.querySelector("input-lock").value = "Read-only until unlocked…";

  for (const button of document.querySelectorAll(
    "button-mdc,button-fab,button-icon"
  )) {
    button.addEventListener("click", e => {
      console.log("click", e);
    });
  }
  window.addEventListener("input", e => {
    const [elmt] = e.composedPath();
    const { name, value } = elmt;
    console.log("input", { name, value });
  });
};

window.addEventListener("DOMContentLoaded", async () => {
  await customElements.whenDefined("nav-bar");
  document.querySelector("body").removeAttribute("hidden");
  demo();
});
