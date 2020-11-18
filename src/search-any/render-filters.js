// Normalize terms by removing term prefixes
// (needed for api v1 when filtering ranges (date/numeric)
const normalizeTerm = term => (/-/.test(term) ? term.split("-")[1] : term);

// Get URL for a facet filter
const u = ([term, value, apiuri], { url, action = "add" } = {}) => {
  // Clone url before mutating searchParams
  url = new URL(url);
  const { searchParams } = url;
  term = normalizeTerm(term);
  if (apiuri) {
    // API v1
    const apiURL = new URL(apiuri);
    for (let [k, apivalue] of apiURL.searchParams) {
      k = normalizeTerm(k);
      if (k === term) {
        searchParams.set(k, apivalue);
      }
    }
  } else {
    //API-v2
    if ("add" === action) {
      searchParams.set(term, value);
    } else {
      searchParams.delete(term);
    }
  }
  return url;
};

const closeFilter = ({
  term,
  value,
  prefix = `${term}.`,
  t,
  label = t(`${prefix}${term}`),
  url,
  html
}) => html`
  <a href="${removeFilterFromURL({ term, url })}">
    <button-up
      icon="close"
      secondary
      title="${t("remove")} ${t(`${prefix}${value}`)} ${t("filter")}"
      label="${label}"
    ></button-up
  ></a>
`;

const addTextFilter = ({
  term,
  value,
  t,
  prefix = `${term}.`,
  label = t(`${prefix}${value}`),
  href,
  url,
  html
}) => html`
  <a href="${href}">
    <button-up secondary elevated label=${label}></button-up>
  </a>
`;

const removeTextFilter = ({
  term,
  value,
  prefix = `${term}.`,
  t,
  label = t(`${prefix}${value}`),
  href,
  url,
  html
}) => html`
  <button-up secondary label=${label} outlined></button-up>
`;

const removeFilterFromURL = ({ term, url }) => {
  const urlclone = new URL(url);
  const { searchParams } = urlclone;
  searchParams.delete(term);
  return urlclone;
};
// todo ... exclude term, configure special filterUI per term/termType?
export const renderFilters = ({
  host,
  facets = [],
  filters = [],
  html,
  limit,
  multi = true,
  translate = true,
  t,
  url = new URL(host.ownerDocument.location)
} = {}) => {
  const p = new URLSearchParams(url.search);

  // console.warn("renderFilters", {
  //   p,
  //   host,
  //   facets,
  //   filters,
  //   limit,
  //   multi,
  //   url
  // });

  const facetedTerms = [...facets].map(([term]) => term);
  const filtersThatAreNotFaceted = [...p]
    .filter(([term, value]) => {
      return (
        !term.startsWith("filter-") && // don't duplicate API v1 style filter-foo=bar
        !["q", "sort", "limit", ...facetedTerms].includes(term) && // ignore API v1
        !["page", "start"].includes(term) // ignore API v2
      );
    })
    .map(([term]) => term);

  return html`
    <dl class="h-scroll h-grid">
      ${facets
        .filter(
          multi ? () => true : ([term]) => !filters.has(normalizeTerm(term))
        )
        .map(([term, f]) => {
          const termIsFiltered = filters.has(normalizeTerm(term));
          return f.length === 0
            ? ""
            : html`
                <dt>
                  ${termIsFiltered
                    ? closeFilter({ term, value: p.get(term), url, html, t })
                    : html`
                        <button-up disabled label="${t(`${term}.${term}`)}">
                        </button-up>
                      `}
                </dt>
                <dd>
                  ${f.map(([value, count, apiuri]) =>
                    !(p.get(term) || "").split(",").includes(value)
                      ? addTextFilter({
                          term,
                          value,
                          href: u([term, value, apiuri], {
                            url,
                            action: "add"
                          }),
                          t,
                          html
                        })
                      : removeTextFilter({
                          term,
                          value,
                          href: u([term, value, apiuri], {
                            url,
                            action: "remove"
                          }),
                          t,
                          html
                        })
                  )}
                </dd>
              `;
        })}
      ${filtersThatAreNotFaceted.map(
        term =>
          html`
            <dt>${closeFilter({ term, url, value: p.get(term), t, html })}</dt>
            <dd>
              <button-up secondary outlined label="${p.get(term)}"></button-up>
            </dd>
          `
      )}
    </dl>
  `;
};
