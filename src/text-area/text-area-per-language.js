import { get as g } from "lit-translate";

export const textAreaPerLanguage = (
  prop,
  obj,
  {
    base = "/",
    path = (prop, lang) => `${base}${prop}/${lang}`,
    fullwidth = true,
    outlined = true,
    rows = 4,
    label = (prop, lang) => g(`${prop}/${lang}`),
    schema,
    languages = schema.languages,
    html
  }
) =>
  html`
    <div class="textarea-per-language">
      ${languages.map(lang => {
        return html`
          <textarea-mdc
            path="${path(prop, lang)}"
            lang=${lang}
            ?outlined=${outlined}
            rows=${rows}
            label="${label(prop, lang)}"
            value=${obj && obj[lang] ? obj[lang] : ""}
          ></textarea-mdc>
        `;
      })}
    </div>
  `;
