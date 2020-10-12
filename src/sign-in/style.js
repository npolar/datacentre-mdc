import { css } from "lit-element";

export default css`
  form,
  input-mdc,
  input-password {
    display: grid;
    min-width: 300px;
    max-width: 600px;
    margin: 10px auto;
  }
  .account_box {
    width: 20%;
    display: inline-block;
  }
  .error {
    color: rgba(176, 0, 32);
  }
  .info {
    font-weight: normal;
  }
`;
