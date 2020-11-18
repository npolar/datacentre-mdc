import { MDCList } from "@material/list";
import { html, LitElement } from "lit-element";
import style from "./list-scss.js";

export const ul = (list = []) => html`<ul class="mdc-list"><slot>
  ${
    list && list.length > 0
      ? list.map(
          li => html`<li class="mdc-list-item mdc-list-item__text">${li}</li>`
        )
      : ""
  }
</slot></ul>`;

export const ol = (list = []) => html`<ol class="mdc-list"><slot>
  ${
    list && list.length > 0
      ? list.map(
          li => html`<li class="mdc-list-item mdc-list-item__text">${li}</li>`
        )
      : ""
  }
</slot></ol>`;

const _list = Symbol();
export class ListBase extends LitElement {
  static get properties() {
    const reflect = true;
    return {
      list: { type: Array },
      ordered: { type: Boolean, reflect },
      "multi-select": { type: Boolean, reflect }
    };
  }

  static get styles() {
    return [style];
  }

  createList() {
    const ul = this.renderRoot.querySelector(".mdc-list");
    const mdclist = new MDCList(ul);
    mdclist.singleSelection = !this["multi-select"];
    return mdclist;
  }

  firstUpdated() {
    super.firstUpdated();
    this[_list] = this.createList();

    const slot = this.shadowRoot.querySelector("slot");
    slot.addEventListener("slotchange", () => {
      const items = slot.assignedElements();

      items.map(item => {
        if (
          ["HTMLLIElement", "HTMLAnchorElement"].includes(item.constructor.name)
        ) {
          item.classList.add("mdc-list-item");
          item.classList.add("mdc-list-item__text");
        }
      });
    });
  }

  render() {
    // [Style Customization](https://github.com/material-components/material-components-web/tree/master/packages/mdc-list#style-customization)
    // CSS Classes
    // CSS Class	Description
    // mdc-list	Mandatory, for the list element.
    // mdc-list--non-interactive	Optional, disables interactivity affordances.
    // mdc-list--dense	Optional, styles the density of the list, making it appear more compact.
    // mdc-list--avatar-list	Optional, configures the leading tiles of each row to display images instead of icons. This will make the graphics of the list items larger.
    // mdc-list--two-line	Optional, modifier to style list with two lines (primary and secondary lines).
    // mdc-list-item	Mandatory, for the list item element.
    // mdc-list-item__text	Mandatory. Wrapper for list item text content (displayed as middle column of the list item).
    // mdc-list-item__primary-text	Optional, primary text for the list item. Should be the child of mdc-list-item__text.
    // mdc-list-item__secondary-text	Optional, secondary text for the list item. Displayed below the primary text. Should be the child of mdc-list-item__text.
    // mdc-list-item--disabled	Optional, styles the row in the disabled state.
    // mdc-list-item--selected	Optional, styles the row in the selected* state.
    // mdc-list-item--activated	Optional, styles the row in the activated* state.
    // mdc-list-item__graphic	Optional, the first tile in the row (in LTR languages, the first column of the list item). Typically an icon or image.
    // mdc-list-item__meta	Optional, the last tile in the row (in LTR languages, the last column of the list item). Typically small text, icon. or image.
    // mdc-list-group	Optional, wrapper around two or more mdc-list elements to be grouped together.
    // mdc-list-group__subheader	Optional, heading text displayed above each list in a group.
    // mdc-list-divider	Optional, for list divider element.
    // mdc-list-divider--padded	Optional, leaves gaps on each side of divider to match padding of list-item__meta.
    // mdc-list-divider--inset	Optional, increases the leading margin of the divider so that it does not intersect the avatar column.
    // NOTE: The mdc-list-divider class can be used between list items OR between two lists (see respective examples under List Dividers).
    //
    // NOTE: In Material Design, the selected and activated states apply in different, mutually-exclusive situations:
    //
    // Selected state should be applied on the .mdc-list-item when it is likely to frequently change due to user choice. E.g., selecting one or more photos to share in Google Photos.
    // Activated state is more permanent than selected state, and will NOT change soon relative to the lifetime of the page. Common examples are navigation components such as the list within a navigation drawer.
    const { ordered, list } = this;
    return ordered ? ol(list) : ul(list);
  }
}
