import { registerTranslateConfig, get, use, translate } from "lit-translate";

const register = (lang, { loader, ...translateConfig } = {}) => {
  registerTranslateConfig({ loader, ...translateConfig });
  return use(lang);
};

export { use, get, translate, register, registerTranslateConfig };
