import nodeResolve from "rollup-plugin-node-resolve";
import liveServer from "rollup-plugin-live-server";
const input = {
  "button-mdc": "src/button/button-mdc.js",
  "button-icon": "src/button/button-icon.js",
  "header-bar": "src/header/header-bar.js",
  "input-mdc": "src/input/input-mdc.js",
  "input-password": "src/input/input-password.js"
};
const dir = "public";

const output = { format: "esm", dir };
const plugins = [
  nodeResolve(),
  liveServer({
    root: dir,
    open: false,
    port: 10001
  })
];
export default { input, plugins, output };
