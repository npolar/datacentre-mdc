// <div class="${classMap({
//   "mdc-card": true,
//   "mdc-typography": true,
//   "mdc-card--outlined": outlined
// })}">
//import { classMap } from "lit-html/directives/class-map.js";

export const td = (text, {numeric=false,html,classMap=()=>""}={}) => {
  const pre = "mdc-data-table";
  const cell = `${pre}__cell`;
  const num = `${td}--numeric`;
  return html`<td class="">${text}</td>`;
}
