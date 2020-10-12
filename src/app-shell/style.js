import { css } from "lit-element";
export default css`
  :host main {
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-rows: 1fr auto;
    min-height: 100vh;
  }

  :host footer {
    margin: 0;
    /*padding: 8px;*/
    align-items: center;
    justify-items: center;
  }

  .primary-bg {
    background: var(--mdc-theme-primary);
    color: var(--mdc-theme-on-primary);
  }

  .primary-fab {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    --mdc-typography-button-text-transform: none;
  }

  .switch {
    --mdc-theme-primary: var(--mdc-theme-secondary);
    background: var(--mdc-theme-secondary);
    color: var(--mdc-theme-on-secondary);
  }
  .switch a {
    color: var(--mdc-theme-on-secondary);
  }
  .name-logo-grid {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
  }
  .logo {
    height: 48px;
  }
  [slot],
  .mdc-typography {
    font-family: Inter var, sans-serif;
  }
`;
