import { LitElement, html } from "lit-element";
import { classMap } from "lit-html/directives/class-map.js";
import "../button/button-icon.js";
import style from "./style.js";

const _icon = icon =>
  html`
    <button-icon icon="${icon}"></button-icon>
  `;

const _byline = txt =>
  html`
    <h3 class="mdc-typography--subtitle2">${txt}</h3>
  `;

const _header = ({ headline = "", byline, href, icon } = {}) => html`
  <header class="header card-header">
    <div class="card-title">
      <h1 class="mdc-typography--headline5">
        ${icon ? _icon(icon) : ""}
        ${href
          ? html`
              <a class="mdc-theme--primary" href="${href}">${headline}</a>
            `
          : html`
              <span>${headline}</span>
            `}
      </h1>
      ${byline ? _byline(byline) : ""}
    </div>
  </header>
`;

export class Card extends LitElement {
  static get properties() {
    const reflect = true;
    return {
      headline: { type: String },
      byline: { type: String },
      href: { type: String },
      icon: { type: String, reflect },
      outlined: { type: Boolean, reflect },
      primaryAction: { type: Boolean, reflect }
    };
  }

  static get styles() {
    return style;
  }
  constructor() {
    super();
    this.outlined = false;
    this.primaryAction = false;
  }

  // classMap goes abonk:
  //markList<div class="(part) => {
  //         <div tabindex="0" class="(part) => {
  //     if (!(part instanceof AttributePart$1) || (part instanceof PropertyPart$1) ||
  //         part.committer.name !== 'class' || part.committer.parts.length > 1) {
  //         throw new Error('The `classMap` directive must be used in the `class` attribute ' +
  //             'and must be the only part in the attribute.');
  //     }
  //     const { committer } = part;
  //     const { element } = committer;
  //     // handle static classes
  //     if (!classMapCache.has(part)) {
  //         element.className = committer.strings.join(' ');
  //     }
  //     const { classList } = element;
  //     // remove old classes that no longer apply
  //     const oldInfo = classMapCache.get(part);
  //     for (const name in oldInfo) {
  //         if (!(name in classInfo)) {
  //             classList.remove(name);
  //         }
  //     }
  //     // add new classes
  //     for (const name in classInfo) {
  //         const value = classInfo[name];
  //         if (!oldInfo || value !== oldInfo[name]) {
  //             // We explicitly want a loose truthy check here because
  //             // it seems more convenient that '' and 0 are skipped.
  //             const method = value ? 'add' : 'remove';
  //             classList[method](name);
  //         }
  //     }
  //     classMapCache.set(part, classInfo);
  // }">

  render({ headline, byline, icon, href, outlined, primaryAction } = this) {
    return html`
      <div
        class="${classMap({
          "mdc-card": true,
          "mdc-typography": true,
          "mdc-card--outlined": outlined
        })}"
      >
        <div
          class="${classMap({
            "mdc-card__primary-action": primaryAction
          })}"
          tabindex="0"
        >
          <slot name="media" class="mdc-card__media"></slot
          ><!-- Slotter needs to add e.g. mdc-card__media--square -->
          <slot name="header" class="card-header"
            >${headline ? _header({ headline, href, icon, byline }) : ""}
          </slot>
        </div>
        <div class="card-main">
          <slot></slot>
        </div>
        <slot name="actions"></slot>
        <slot name="end"></slot>
      </div>
    `;
  }
}
customElements.define("card-mdc", Card);
