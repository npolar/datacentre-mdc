import { LitElement, html, css } from "lit-element";

// Search/query
import {
  request as get,
  searchURL,
  facetEntries as simplifyV1Facets,
  isAPIv1Param
} from "@npolar/fetch-api/src/v1/exports.js";

const mapifyV2Facets = (facets = []) =>
  Object.keys(facets).map(term => [
    term,
    facets[term].map(({ value, count }) => [value, count])
  ]);

// events
import { addListeners, emit } from "../host/event.js";
import { handlers } from "./handlers.js";
import { renderFilters } from "./render-filters.js";

// URLSearchParams
import {
  searchParams,
  add as addURLParam,
  remove as removeURLParam
} from "../url/params.js";

// styling
import _mdc from "../style/shared-scss.js";
import _card from "../card/card-scss.js";
import _style from "./style.js";

//translate
import { get as t } from "../translate/exports.js";

// side-effects (define custom elements)
import "../input/exports.js";
import "../button/exports.js";
import "../list/list-icon.js";

const { stringify } = JSON;

const renderResults = ({ host, entries = [], html, t } = {}) => html`
  <ol>
    ${entries.map(
      ({ title, name, ...rest }) =>
        html`
          <li>${stringify(title || name || rest)}</li>
        `
    )}
  </ol>
`;

const renderInput = ({ host, params, html, t } = {}) => html`
  <input-search
    type="search"
    autofocus
    autocomplete="false"
    label=" "
    placeholder="${t(`${host.localName}.input.placeholder`)}"
    .value=${params.get("q") || ""}
  ></input-search>
`;
// * {
// --mdc-typography-button-text-transform: uppercase;

// Search Any NPOLAR JSON API (v1 and v2)
export class SearchAny extends LitElement {
  static get styles() {
    return [
      _mdc,
      _card,
      _style,
      css`
        a {
          color: var(--mdc-theme-secondary);
        }
      `
    ];
  }
  static get properties() {
    return {
      entries: { type: Object },
      lang: { type: String, reflect: true },
      offline: { type: Boolean },
      authorized: { type: Boolean }
    };
  }

  constructor({ endpoint, heading } = {}) {
    super();
    this.heading = heading || t(`${this.localName}.heading`);
    this.endpoint = endpoint;
    this.renderInput = renderInput;
    this.renderResults = renderResults;
    this.renderFilters = renderFilters;
    this.renderBefore = ({ html }) => ``;
    this.renderAfter = ({ html }) => ``;
    this.filterLimit = () => 7;
    this.inputSelector = "input-search";
    this.filters = new URLSearchParams();
    this.not = new URLSearchParams();
    this.handlers = handlers;
  }

  async search() {
    let { heading, filters, not } = this;
    const host = this;
    const { lang, offline, endpoint } = this;
    const params = searchParams();

    const q = params.has("q") ? params.get("q") : "";
    const fields = params.has("fields") ? params.get("fields") : undefined;
    const facets = params.has("facets") ? params.get("facets") : undefined;
    let sort = params.has("sort") ? params.get("sort") : undefined;

    for (let [k, v] of params) {
      {
        let m;
        if ((m = /^no?t?-(.+)$/.exec(k))) {
          const nokey = m[1];
          not.set(nokey, v);
        } else if (!isAPIv1Param(k)) {
          // API v1 and npdc-common URL compatability, ie. support: filter-area=Svalbard
          if ((m = /^filter-(.+)$/.exec(k))) {
            const f = m[1];
            filters.set(f, v);
          } else {
            console.log("@todo auto-filter enable/disable?");
            filters.set(k, v);
          }
        }
      }
    }

    if (q !== "") {
      sort = undefined;
      removeURLParam("sort");
      heading += `: "${q}"`;
    } else {
      removeURLParam("q");
      //addURLParam("sort");
    }

    if (offline === true) {
      this.searchOffline();
    } else {
      const url = this.searchURL({
        q,
        fields,
        endpoint,
        filters,
        not,
        sort,
        facets,
        offline
      });
      const r = await fetch(url).catch(e => {
        // @todo handle search-any when search fetch throws and there is no response (no internet)
        this.searchOffline();
      });

      if (r && r.ok) {
        const body = await r.json();

        if (body.feed) {
          // API v1
          const {
            feed: { opensearch, entries, facets }
          } = body;
          this.setFeed({
            opensearch,
            entries,
            facets: simplifyV1Facets(facets)
          });
        } else if (body.results && body.stats) {
          // API v2
          const { totalResults } = body.stats;
          const { results, facets } = body;

          this.setFeed({
            opensearch: { totalResults },
            entries: results,
            facets: mapifyV2Facets(facets)
          });
        }
      } else {
        // @todo handle search-any when response status is not 200
        // this.searchOffline();
      }
    }
  }

  searchURL({ q, endpoint, sort, ...params }) {
    return searchURL({
      q,
      endpoint,
      sort,
      limit: 15,
      ...params,
      variant: "feed"
    });
  }

  // //import { reverseAll } from "@npolar/idb-store/src/reverse.js";
  // async searchOffline() {
  //   const params = searchParams();
  //   const q = params.has("q") ? params.get("q") : "";
  //   let entries = await reverseAll({
  //     index: "released",
  //     store: this.store
  //   });
  //   if (q && q.length > 0) {
  //     const re = new RegExp(`${q}`, "i");
  //     entries = (entries || []).filter(d => re.test(stringify(d)));
  //   }
  //   this.setFeed({ entries, opensearch: {} });
  // }

  setFeed({ opensearch, entries, facets }) {
    this.entries = entries;
    this.facets = facets || [];
    this.opensearch = opensearch || {};
  }

  removeFilter(name) {
    this.filters.delete(name);
    removeURLParam(name);
    this.search();
  }

  connectedCallback() {
    super.connectedCallback();

    emit({
      host: this,
      name: "@npolar/title",
      detail: { title: this.heading }
    });

    addListeners({
      host: this,
      attachTo: this,
      handlers: this.handlers({ host: this })
    });

    const params = searchParams();
    this.search();
  }

  // disconnectedCallback() {
  //   removeListeners({
  //     host: this,
  //     attachTo: this,
  //     handlers: handlers({ host: this, window })
  //   });
  //
  //   super.disconnectedCallback();
  // }

  render() {
    const {
      endpoint,
      entries,
      facets,
      renderBefore,
      renderAfter,
      renderInput,
      renderResults,
      renderFilters,
      filterLimit,
      opensearch,
      lang,
      filters,
      toggleFilter,
      offline
    } = this;
    const host = this;
    const params = searchParams();
    const q = params.get("q");
    return html`
      <slot name="before" class="search-before">
        ${renderBefore({ host, params, html, t })}
      </slot>
      <div>
        ${[undefined, ""].includes(q)
          ? html`
              <div class="center">
                <h1 class="mdc-typography--headline3">
                  ${t(`${this.localName}.welcome`)}
                </h1>
              </div>
            `
          : ""}
        <slot name="input" class="search-box">
          <span></span>
          ${renderInput({ host, params, html, t })}
          <span></span>
        </slot>

        <div class="search-box">
          <span></span>
          <span>
            ${renderFilters({
              host,
              facets,
              filters,
              limit: filterLimit,
              html,
              t
            })}
          </span>

          <span class="mdc-typography--body2">
            ${opensearch && opensearch.totalResults
              ? html`
                  ${opensearch.totalResults}
                  ${q === ""
                    ? t(`${this.localName}.documents`)
                    : t("opensearch.totalResults")}
                `
              : ""}
          </span>
        </div>
        <slot name="results" class="search-results">
          ${renderResults({ host, entries, html, t })}
        </slot>
        <slot name="more" class="search-more"></slot>
        <slot name="after" class="search-after">
          ${renderAfter({ host, params, html, t })}
        </slot>
      </div>
    `;
  }
}
customElements.define("search-any", SearchAny);
// <a href="/edit/${id}" hidden=${!authorized}>
//   <button-fab class="primary-fab" icon=${"edit"} label=${t("any.Edit")}>
//   </button-fab>
// // </a>
// <button-fab
//   data-key=${k}
//
//   icon="close"
//   mini
//   extended
//   label=${v}
// ></button-fab>
