const _h = (text, { html, icon, n }) =>
  html`
    <h1 class="mdc-typography--headline${n}">
      ${icon
        ? html`
            <button-icon icon=${icon}> </button-icon>
          `
        : ""}
      ${text}
    </h1>
  `;

export const h0 = (text, { html, icon, n = 1 } = {}) =>
  _h(text, { html, icon, n });

export const h1 = (text, { html, icon, n = 2 } = {}) =>
  _h(text, { html, icon, n });

export const h2 = (text, { html, icon, n = 3 } = {}) =>
  _h(text, { html, icon, n });

export const h3 = (text, { html, icon, n = 4 } = {}) =>
  _h(text, { html, icon, n });

export const h4 = (text, { html, icon, n = 5 } = {}) =>
  _h(text, { html, icon, n });

export const h5 = (text, { html, icon, n = 6 } = {}) =>
  _h(text, { html, icon, n });

export const h6 = (text, { html, icon, n = 7 } = {}) =>
  _h(text, { html, icon, n });
