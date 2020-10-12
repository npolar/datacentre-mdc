import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { eslint } from "rollup-plugin-eslint";
import { terser } from "rollup-plugin-terser";
import filesize from "rollup-plugin-filesize";
import liveserver from "rollup-plugin-live-server";
import pkg from "./package.json";
const exclude = ["lit-element", "lit-html", "lit-translate"];
const deps = [...Object.keys(pkg.dependencies)].filter(
  name => !exclude.includes(name)
);

const input = ["src/demo-app.js"]; //, ...deps];

const dir = "dist";
const format = "esm";
const output = { format, dir };
const terserConfig = {
  parse: {
    html5_comments: false
  },
  output: {
    comments: false
  }
};
let plugins = [nodeResolve(), commonjs(), filesize()];

const app = {
  input,
  output,
  plugins
};

const { ROLLUP_WATCH } = process.env;
if (ROLLUP_WATCH) {
  const liveserverConfig = {
    root: dir,
    open: false,
    file: "index.html",
    port: 7777
  };

  plugins = [...plugins, liveserver(liveserverConfig)];
} else {
  plugins = [...plugins, eslint(), terser(terserConfig)];
}

export default [app];
