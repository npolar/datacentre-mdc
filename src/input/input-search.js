import { Input } from "./input.js";
export class InputSearch extends Input {
  constructor() {
    super();
    this.iconTrailing = "search";
  }
}
customElements.define("input-search", InputSearch);
