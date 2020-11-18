import { css } from "lit-element";

export default css`


  .center {
    display: grid;
    align-items: center;
    justify-items: center;
  }
  .search-box {
    display: grid;
    grid-template-columns: 0.5fr 18fr 0.5fr;
    padding: 12px;
    grid-gap: 0.5em;
  }

  .search-results {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 0.1em;
    padding: 12px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  dl,
  dt,
  ul,
  ol,
  li,
  p {
    margin: 0;
    padding: 0;
  }

  .h-scroll {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    max-width: 90vw;
  }
  .h-scroll .card {
    display: inline-block;:
  }



  .h-scroll {
    /*height: 80px;
      margin-bottom: 20px;
      width: 100%;*/
    -webkit-overflow-scrolling: touch;
  }
  .h-scroll::-webkit-scrollbar {
    display: none;
  }

  :host {
    /* Disables UPPERCASE on everything, intended for facet buttons */
    --mdc-typography-button-text-transform: none;
  }

  .primary-fab {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
  }
  /* Thanks! https://codepen.io/bramus/pen/POEaXg */

    dl {
      display: grid;
      grid-template: auto 1fr;
    }

    dt {
      grid-column: 1;
    }

    dd {
      grid-column: 2;
    }

    dt,
    dd {
      margin: 0;
      /*padding: 30em 0.5em;/*
      border-top: 1px solid rgba(0, 0, 0, 0.1); */
    }

`;
