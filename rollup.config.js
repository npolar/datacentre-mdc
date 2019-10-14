import nodeResolve from "rollup-plugin-node-resolve";
import { eslint } from "rollup-plugin-eslint";
import liveServer from "rollup-plugin-live-server";
const input = {
  "button-mdc": "src/button/button-mdc.js",
  "button-icon": "src/button/button-icon.js",
  "button-fab": "src/button/button-fab.js",
  "header-bar": "src/header/header-bar.js",
  "input-mdc": "src/input/input-mdc.js",
  // "input-search": "src/input/input-search.js",
  "input-lock": "src/input/input-lock.js",
  "input-password": "src/input/input-password.js"
};

const dir = "dist/@npolar/mdc";
const plugins = [eslint(), nodeResolve()];
const output = { format: "esm", dir };

const { ROLLUP_WATCH } = process.env;
if (ROLLUP_WATCH) {
  const liveServerConfig = {
    root: "dist",
    open: false,
    port: 7777
  };
  plugins.push(liveServer(liveServerConfig));
}
export default { input, plugins, output };
