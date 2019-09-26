import nodeResolve from "rollup-plugin-node-resolve";
import liveServer from "rollup-plugin-live-server";
const input = {
  "button-mdc": "src/button/button-mdc.js",
  "button-icon": "src/button/button-icon.js",
  "header-bar": "src/header/header-bar.js",
  "input-mdc": "src/input/input-mdc.js",
  "input-password": "src/input/input-password.js"
};

const dir = "dist";
const plugins = [nodeResolve()];
const output = { format: "esm", dir };

const { ROLLUP_WATCH } = process.env;
if (ROLLUP_WATCH) {
  const liveServerConfig = {
    root: "dist",
    open: false,
    port: 10001
  };
  plugins.push(liveServer(liveServerConfig));
}
export default { input, plugins, output };
