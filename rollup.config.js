import nodeResolve from "rollup-plugin-node-resolve";

const input = {
  "button-mdc": "src/button/button-mdc.js",
  "upload-v": "src/upload/upload-v.js"
};

const output = { format: "esm", dir: "dist" };
const plugins = [nodeResolve()];
export default { input, plugins, output };
