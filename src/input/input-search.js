import { Input } from "./input.js";
export class InputSearch extends Input {
  constructor() {
    super();
    this.icon = "search";
  }
}
customElements.define("input-search", InputSearch);
