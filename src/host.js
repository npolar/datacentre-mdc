export const emit = (host, name, detail) => {
  const event = new CustomEvent(name, {
    detail,
    bubbles: true,
    composed: true,
    cancelable: true
  });
  host.dispatchEvent(event);
};

export const addListeners = (host, { to, handlers } = {}) => {
  console.warn("deprecated, import from host/event.js not host.js");
  for (const [eventname, on] of handlers) {
    to.addEventListener(eventname, on);
  }
};

export const getCSSProperty = (host, p) =>
  getComputedStyle(host)
    .getPropertyValue(p)
    .trim();

// const toggleCSSProperties = (host, p0, p1) => {
//   const c0 = getComputedStyle(host).getPropertyValue(p0);
//   const c1 = getComputedStyle(host).getPropertyValue(p1);
//   host.style.setProperty(p0, c1);
//   host.style.setProperty(p1, c0);
// };

export const PRIMARY = "--mdc-theme-primary";
export const ON_PRIMARY = "--mdc-theme-on-primary";
export const SECONDARY = "--mdc-theme-secondary";
export const ON_SECONDARY = "--mdc-theme-on-secondary";

export const getThemeProperties = host => {
  return {
    primary: getCSSProperty(host, PRIMARY),
    onPrimary: getCSSProperty(host, ON_PRIMARY),
    secondary: getCSSProperty(host, SECONDARY),
    onSecondary: getCSSProperty(host, ON_SECONDARY)
  };
};
/* eslint-disable consistent-return */
export const getAttribute = (host, name) => {
  let element = host;
  while (element !== null && element.parentElement) {
    if (element.hasAttribute(name)) {
      return element.getAttribute(name);
    }
    element = element.parentElement;
  }
};
