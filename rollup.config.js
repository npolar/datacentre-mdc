import nodeResolve from "rollup-plugin-node-resolve";

const input = {
  "datacentre-mdc": "src/export.js"
};

const output = { format: "esm", dir: "dist" };
const plugins = [nodeResolve()];
export default { input, plugins, output };
