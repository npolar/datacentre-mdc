import { html } from "lit-element";
export const options = (value, schema = {}) => {
  //const { type, required } = schema;
  // const defaultValue = schema.default;
  // if (undefined === value) {
  //   value = defaultValue;
  // }

  return (schema.enum || []).map(
    option =>
      html`
        <option value="${option}" ?selected=${value === option}>
          ${option}
        </option>
      `
  );
};
