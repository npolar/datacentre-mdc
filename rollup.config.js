import nodeResolve from "rollup-plugin-node-resolve";

const input = {
  "button-mdc": "src/button/button-mdc.js",
  "button-icon": "src/button/button-icon.js"
  //"header-bar": "src/header/header-bar.js"
};

const output = { format: "esm", dir: "dist" };
const plugins = [nodeResolve()];
export default { input, plugins, output };
