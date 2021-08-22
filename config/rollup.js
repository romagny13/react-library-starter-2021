const fs = require("fs");
const rollup = require("rollup");
const typescript = require("@rollup/plugin-typescript");
const uglify = require("uglify-js"); // terser ?
const package = require("../package.json");

const fileName = package.name;
const libName = fileName; // CHANGE
const author = package.author;
const version = package.version;

const banner = `/*!
  * ${libName} v${version}
  * (c) ${new Date().getFullYear()} ${author}
  * @license MIT
  */`;

const getSize = (code) => (code.length / 1024).toFixed(2) + "kb";
const blue = (str) => "\x1b[1m\x1b[34m" + str + "\x1b[39m\x1b[22m";

function writeFile(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, function (err) {
      if (err) return reject(err);
      console.log(blue(path) + " " + getSize(data));
      resolve();
    });
  });
}

rollup
  .rollup({
    input: "./src/index.ts",
    plugins: [typescript()],
  })
  .then((bundle) => bundle.generate({ format: "umd", banner, name: "lib" }))
  .then((result) => {
    const code = result.output[0].code;
    writeFile(`dist/${fileName}.js`, code);
    // minified
    const minified = uglify.minify(code).code;
    writeFile(`dist/${fileName}.min.js`, minified);
  })
  .catch((error) => console.log(error));
