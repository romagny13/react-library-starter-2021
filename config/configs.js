/**
 * USED by rollup.js
 * can be executed with a script: "build": "rollup -c build/configs.js"
 */
const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const replace = require("@rollup/plugin-replace");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const { babel } = require("@rollup/plugin-babel");
const postcss = require("rollup-plugin-postcss");
const { terser } = require("rollup-plugin-terser");
const pkg = require("../package.json");

const libraryName = "ReactLibraryStarter";
const fileName = pkg.name;
const author = pkg.author;
const version = pkg.version;

const extensions = [".js", ".ts", ".tsx"];

const banner = `/*!
  * ${libraryName} v${version}
  * (c) ${new Date().getFullYear()} ${author}
  * @license MIT
  */`;

const input = "./src/index.tsx";

const globals = { react: "React" };

const plugins = [
  peerDepsExternal(),
  nodeResolve({ extensions }),
  commonjs({
    include: /node_modules/
  }),
  babel({
    extensions,
    exclude: /node_modules/,
    babelHelpers: "bundled"
  }),
  postcss()
];

module.exports = [
  {
    input,
    output: {
      file: `./dist/${fileName}.js`,
      banner,
      format: "umd",
      name: libraryName,
      globals
    },
    plugins: [
      replace({
        "process.env.NODE_ENV": JSON.stringify("development"),
        preventAssignment: true
      }),
      ...plugins
    ]
  },
  {
    input,
    output: {
      file: `./dist/${fileName}.min.js`,
      format: "umd",
      name: libraryName,
      globals
    },
    plugins: [
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
        preventAssignment: true
      }),
      ...plugins,
      terser()
    ]
  }
];
