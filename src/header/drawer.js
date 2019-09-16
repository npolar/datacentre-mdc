import { html } from "lit-element";
export const drawer = html`
  <nav class="mdc-typography">
    <ul class="mdc-list">
      <a class="mdc-list-item" href="dataset" tabindex="0">
        <span>Dataset catalogue</span>
      </a>
      <a class="mdc-list-item" href="#">
        <span>What else?</span>
      </a>
      <hr class="mdc-list-divider" />
      <a class="mdc-list-item" href="#apps">
        <span>More…</span>
      </a>
      <hr class="mdc-list-divider" />
      <a class="mdc-list-item" href="/settings">
        <button-icon icon="settings"> </button-icon>
        Settings
      </a>
      <a class="mdc-list-item" href="/sign-in" tabindex="-1">
        <button-icon icon="account_box"> </button-icon>
        Sign in
      </a>
    </ul>
  </nav>
`;
