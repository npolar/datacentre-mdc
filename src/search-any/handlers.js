import { oninputFactory } from "./oninput.js";

export const handlers = ({ host }) =>
  new Map([
    [
      "input",
      oninputFactory({ host, selector: host.inputSelector, method: "search" })
    ]
  ]);
