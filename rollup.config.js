import nodeResolve from "rollup-plugin-node-resolve";
import { eslint } from "rollup-plugin-eslint";
import liveServer from "rollup-plugin-live-server";
const input = {
  "button-mdc": "src/button/exports.js",
  //"card-mdc": "src/card/exports.js",
  "input-mdc": "src/input/exports.js",
  "select-mdc": "src/select/exports.js",
  "nav-mdc": "src/nav/exports.js",
  demo: "src/demo.js"
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
