import { html } from "lit-element";
import { translate as t } from "lit-translate";
import { classMap } from "lit-html/directives/class-map.js";

const areas = ["Svalbard", "Bouvetøya"];
export const areaFilterList = selected => html`
  <div>
    <h1 class="mdc-typography--headline4">${t("name.Area")}</h1>
    <ul-mdc class="center">
      ${areas.map(
        area =>
          html`
            <a href="/?area=${area}"
              ><li
                class="mdc-list-item ${classMap({
                  "mdc-list-item--activated": selected === area
                })}"
                tabindex=${selected === area ? 0 : -1}
              >
                <button-icon aria-hidden="true" icon="place"></button-icon>
                <span class="mdc-list-item__text">${area}</span>
              </li></a
            >
          `
      )}
    </ul-mdc>
  </div>
`;
