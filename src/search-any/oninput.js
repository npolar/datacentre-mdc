import { set } from "../url/params.js";

export const oninputFactory = ({ host, selector, method }) => () => {
  // 1. Get query q from input via selector
  // 2. Reflect q to URL
  // 3. Perform search via calling method
  const input = host.renderRoot.querySelector(selector);
  const { value } = input;
  const q = value;
  set("q", q);
  host[method]({ q });
};
