import { html } from "lit-element";
export const footer = html`
  <hr class="mdc-list-divider" />
  <a class="mdc-list-item" href="/settings">
    <button-icon icon="settings"></button-icon>
    <li>Preferences</li>
  </a>
  <a class="mdc-list-item" href="/sign-in">
    <button-icon icon="account_box"></button-icon>
    <li>Sign in</li>
  </a>
`;

export const drawer = html`
  <nav class="mdc-typography">
    <ul class="mdc-list">
      <a class="mdc-list-item" href="#dataset" tabindex="0">
        <span>Dataset catalogue</span>
      </a>
      <a class="mdc-list-item" href="#what-else?">
        <span>What else?</span>
      </a>
      <hr class="mdc-list-divider" />
      <a class="mdc-list-item" href="#apps">
        <span>More…</span>
      </a>
      ${footer}
    </ul>
  </nav>
`;
