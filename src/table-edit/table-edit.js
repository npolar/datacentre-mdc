import { css, html, LitElement } from "lit-element";
import { translate as t } from "lit-translate";

import { emit } from "../host.js";

import "../button/exports.js";
import { scss, events, MDCDataTable } from "../table/exports.js";

import { cell, checkbox, columnheader, columnheaderCheckbox } from "./html.js";
const ds = (
  datestring = new Date().toJSON(),
  locale = "default",
  { datestyle = "long" } = {}
) =>
  new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(
    new Date(datestring)
  );

const ts = (
  datestring = new Date().toJSON(),
  locale = "default",
  { datestyle, timeStyle = "short" } = {}
) =>
  new Intl.DateTimeFormat(locale, { datestyle, timeStyle }).format(
    new Date(datestring)
  );

const { stringify } = JSON;

const { SELECTED_ALL, UNSELECTED_ALL, ROW_SELECTION_CHANGED } = events;

const _dataTable = Symbol();

export class TableEdit extends LitElement {
  static get styles() {
    return [
      scss,
      css`
        header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          justify-content: flex-end;
          font-family: "Inter var";
          background: var(--mdc-theme-secondary);
          color: var(--mdc-theme-on-secondary);
        }
        ,
        mwc-icon-button {
          color: var(--mdc-theme-secondary);
        }
      `
    ];
  }
  static get properties() {
    return {
      header: { type: String },
      patches: { type: Array },
      selectedSet: { type: Set },
      setkey: { type: Function },
      lang: { type: String },
      time: { type: Number }
    };
  }

  constructor() {
    super();
    this.selectedSet = new Set();
    this.setkey = (p, rowIndex) => rowIndex; //p.path;
    window.addEventListener("langChanged", e => {
      const { lang } = e.detail;
      this.lang = lang;
    });
  }

  updated(p) {
    if (p.has("patches")) {
      this[_dataTable].foundation_.adapter_.registerRowCheckboxes();
    }
  }

  firstUpdated(p) {
    const host = this.renderRoot.querySelector(".mdc-data-table");
    this[_dataTable] = new MDCDataTable(host); //@todo destroy

    const { patches, selectedSet, setkey } = this;

    //This select all rows (checked checkboxes)
    let i = 0;
    this.selectedSet = new Set(this.patches.map(p => this.setkey(p, i++)));

    host.addEventListener(ROW_SELECTION_CHANGED, ({ detail }) => {
      const { rowIndex, selected } = detail;

      const key = setkey(patches[rowIndex], rowIndex);
      if (selected === true) {
        selectedSet.add(key);
      } else {
        selectedSet.delete(key);
      }
      this.time = Number(new Date());
    });

    host.addEventListener(SELECTED_ALL, () => {
      let r = 0;
      this.selectedSet = new Set(this.patches.map(p => setkey(p, r++)));
    });

    host.addEventListener(UNSELECTED_ALL, () => (this.selectedSet = new Set()));
  }

  async undo(e) {
    const { index, key } = e.target.dataset;
    let j = 0;
    const patches = [...this.patches];
    const { setkey } = this;

    const removedIndex = patches.findIndex(p => key === setkey(p, j++));
    console.log(index, removedIndex);
    //@todo assert index==removedIndex
    const [removed] = patches.splice(Number(index), 1);

    emit(this, "@npolar/local-edits", {
      op: "remove",
      path: removed.path,
      value: removed
    });
  }

  render() {
    const {
      header,
      patches,
      selectedSet,
      undo,
      setkey
    } = this;
    let u = 0;
    return html`
      <div class="mdc-data-table">
        <header>
          <span class="mdc-typography--headline5">
            ${header} ${JSON.stringify([...selectedSet])}
          </span>
          <span class="actions"></span>
        </header>
        <table
          class="mdc-data-table__table"
          aria-label="${t("local-edits.table.label")}"
        >
          <thead>
            <tr class="mdc-data-table__header-row">
              ${columnheaderCheckbox({
                html,
                checked: selectedSet.size === patches.length,
                indeterminate: selectedSet.size !== patches.length
              })}
              ${columnheader(t("name.placename"), { html })}
              ${columnheader(t("patch.date"), { html, numeric: true })}
              ${columnheader(t("patch.time"), { html, numeric: true })}
              ${columnheader(t("patch.actions "), { html, numeric: true })}
            </tr>
          </thead>
          <tbody class="mdc-data-table__content">
            ${patches.map(
              ({ name, op, path, value, from, extra = {} } = {}) => {
                const { when, remote } = extra;
                const key = setkey({ op, path, value, from, extra }, u);
                const selected = selectedSet.has(key);
                return html`
                  <tr
                    data-row-id="u${u}"
                    class="mdc-data-table__row"
                    aria-selected="${selected ? true : false}"
                  >
                    <td
                      class="mdc-data-table__cell mdc-data-table__cell--checkbox"
                    >
                      <div class="mdc-data-table__row-checkbox">
                        ${checkbox({ html, checked: selected })}
                      </div>
                    </td>
                    ${cell(name["@value"], { html })} ${cell(op, { html })}
                    ${cell(
                      html`
                        <span>
                          ${stringify(value)}
                          <br />
                          ${stringify(remote)}
                        </span>
                      `,
                      { html, id: `u${u}` }
                    )}
                    ${cell(ds(when), { numeric: true, html })}
                    ${cell(ts(when), { numeric: true, html })}
                    ${cell(
                      html`
                        <mwc-icon-button
                          ?hidden=${!selected}
                          data-index=${u++}
                          data-key=${key}
                          icon="undo"
                          title="${t("undo")}"
                          @click=${undo}
                        ></mwc-icon-button>
                      `,
                      { numeric: true, html }
                    )}
                  </tr>
                `;
              }
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}
customElements.define("table-edit", TableEdit);
