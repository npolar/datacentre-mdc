export const en = "en";
export const nn = "nn";
export const no = "no";
export const nb = "nb";
const norwegian = [nn, no, nb];

const chop = code => code.substring(0, 2);
export const isEnglish = code => chop(code) === en;
export const isNorwegian = code => norwegian.includes(chop(code));

export const browserLanguages = () => {
  return [...new Set(window.navigator.languages.map(l => chop(l)))];
};

export const browserLanguage = () => {
  const [lang] = browserLanguages();
  return lang;
};

export const prefer = ({ fallback = en } = {}) => {
  const b = browserLanguage();
  if (isEnglish(b)) {
    return en;
  } else if (isNorwegian(b)) {
    return b;
  } else {
    return fallback;
  }
};
