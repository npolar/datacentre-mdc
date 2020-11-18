import "@material/mwc-formfield";
import "@material/mwc-switch";

export const render = ({ checked, label, id = label, html } = {}) => html`
  <mwc-formfield label=${label}>
    <mwc-switch ?checked=${checked}></mwc-switch>
  </mwc-formfield>
`;
