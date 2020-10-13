// <div class="${classMap({
//   "mdc-card": true,
//   "mdc-typography": true,
//   "mdc-card--outlined": outlined
// })}">
//import { classMap } from "lit-html/directives/class-map.js";

export const td = (text, {numeric=false,html,classMap=()=>""}={}) => {
  return html`<td class="">${text}</td>`;
};
