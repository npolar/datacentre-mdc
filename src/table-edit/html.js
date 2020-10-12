const mdt = "mdc-data-table";
const mcb = "mdc-checkbox";

const th = `${mdt}__header-cell`;
const tr = `${mdt}__row`;
const __cell = `${mdt}__cell`;

import { cssClasses } from "../table/exports.js";

// export const cssClasses = {
//   CELL: 'mdc-data-table__cell',
//   CELL_NUMERIC: 'mdc-data-table__cell--numeric',
//   CONTENT: 'mdc-data-table__content',
//   HEADER_ROW: 'mdc-data-table__header-row',
//   HEADER_ROW_CHECKBOX: 'mdc-data-table__header-row-checkbox',
//   ROOT: 'mdc-data-table',
//   ROW: 'mdc-data-table__row',
//   ROW_CHECKBOX: 'mdc-data-table__row-checkbox',
//   ROW_SELECTED: 'mdc-data-table__row--selected',
// };

export const cell = (
  content,
  {
    numeric = false,

    html
  } = {}
) => html`
  <td class="${__cell} ${numeric ? `${__cell}--numeric` : ""}">
    ${content}
  </td>
`;

export const columnheader = (
  text,
  {
    role = "columnheader",
    scope = "col",
    numeric = false,
    checkbox = false,
    html
  } = {}
) => html`
  <th
    class="${mdt}__header-cell ${numeric
      ? `${mdt}__header-cell--numeric`
      : ""} ${checkbox ? `${mdt}__header-cell--checkbox` : ""}"
    role=${role}
    scope=${scope}
  >
    ${text}
  </th>
`;

const _checkbox = ({ checked = false, html }) => {
  const ch = html`
    <input
      ?checked=${checked}
      type="checkbox"
      class="mdc-checkbox__native-control"
      aria-label="Checkbox for header row selection"
    />
    <div class="mdc-checkbox__background">
      <svg class="mdc-checkbox__checkmark" viewbox="0 0 24 24">
        <path
          class="mdc-checkbox__checkmark-path"
          fill="none"
          d="M1.73,12.91 8.1,19.28 22.79,4.59"
        />
      </svg>
      <div class="mdc-checkbox__mixedmark"></div>
    </div>
  `;
  return columnheader(ch, { html });
};

export const checkbox = ({ html, checked }) => {
  // checked=>mdc-checkbox--selected ?
  const cb = html`
    <div class="${mcb}">
      ${_checkbox({ checked, html })}
    </div>
  `;
  return cb;
};

export const columnheaderCheckbox = ({ html }) => {
  const ch = html`
    <div
      class="mdc-checkbox ${mdt}__header-row-checkbox mdc-checkbox--selected"
    >
      ${_checkbox({ html })}
    </div>
  `;
  return columnheader(ch, { html });
};

// <tbody2 class="__mdc-data-table__content">
//   ${patches.map(({ op, path, value, from, extra }) => {
//     const { when, prev, initial } = extra;
//     return html`
//       <tr data-row-id="u0" class="mdc-data-table__row">
//         <td></td>
//         <td class=${"td"}>${path}</td>
//         <td class="mdc-data-table__cell" id="u0">
//           ${stringify(value)}
//         </td>
//         <td class="${"tdn"}">
//           ${ds(when)}
//         </td>
//       </tr>
//     `;
//   })}
// </tbody2>
