import en from "./text/en.js";
import nn from "./text/nn.js";

// Lazy loading with ES2020 [dynamic import](https://v8.dev/features/dynamic-import):
// export const loader = async lang => {
//   const m = await import(`/text/${lang}.js`);
//   return m.default;
// };

export const loader = async lang => {
  return lang === "nn" ? nn : en;
};

//export const loader = dicts => async lang => dicts.get(lang);
