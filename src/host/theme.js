export const getCSSProperty = (property, { host }) =>
  getComputedStyle(host)
    .getPropertyValue(property)
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
    primary: getCSSProperty(PRIMARY, { host }),
    onPrimary: getCSSProperty(ON_PRIMARY, { host }),
    secondary: getCSSProperty(SECONDARY, { host }),
    onSecondary: getCSSProperty(ON_SECONDARY, { host })
  };
};
/* eslint-disable consistent-return */
export const getAttributeFromSelfOrAncestor = (name, { host }) => {
  let element = host;
  while (element !== null && element.parentElement) {
    if (element.hasAttribute(name)) {
      return element.getAttribute(name);
    }
    element = element.parentElement;
  }
};
