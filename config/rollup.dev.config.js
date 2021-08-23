const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const replace = require("@rollup/plugin-replace");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const { babel } = require("@rollup/plugin-babel");
const postcss = require("rollup-plugin-postcss");
const serve = require("rollup-plugin-serve");
const livereload = require("rollup-plugin-livereload");

const extensions = [".js", ".ts", ".tsx"];

export default {
  input: "./example/index.tsx",
  output: {
    file: "./example/build.js",
    format: "umd",
    name: "ReactLibraryStarter",
    globals: {
      react: "React",
      "react-dom": "ReactDOM",
    },
  },
  external: ["react", "react-dom"],
  plugins: [
    peerDepsExternal(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
      preventAssignment: true,
    }),
    nodeResolve({ extensions }),
    commonjs({
      include: /node_modules/,
    }),
    babel({
      extensions,
      exclude: /node_modules/,
      babelHelpers: "bundled",
      // babelrc: false,
      // presets: [
      //   "@babel/preset-env",
      //   "@babel/preset-react",
      //   "@babel/preset-typescript",
      // ]
    }),
    postcss(),
    serve({
      open: true,
      openPage: "/",
      host: "localhost",
      port: 3000,
      contentBase: ["./example"],
    }),
    livereload({
      watch: ["./example"],
      exts: ["html", "js", "css"],
    }),
  ],
};
