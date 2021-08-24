/**
 * ALLOWS TO BUILD Library (source in React + Typescript) with Node.js
 * Script example : "build": "node config/rollup.js"
 * Change outDir
 */
const fs = require("fs");
const { rollup } = require("rollup");
const configs = require("./configs"); // configs provided
const outDir = "./dist"; // output directory

// colors for console
const colors = {
  FgBlack: m => "\x1b[30m" + m + "\x1b[39m\x1b[22m",
  FgRed: m => "\x1b[31m" + m + "\x1b[39m\x1b[22m",
  FgGreen: m => "\x1b[32m" + m + "\x1b[39m\x1b[22m",
  FgYellow: m => "\x1b[33m" + m + "\x1b[39m\x1b[22m",
  FgBlue: m => "\x1b[34m" + m + "\x1b[39m\x1b[22m",
  FgMagenta: m => "\x1b[35m" + m + "\x1b[39m\x1b[22m",
  FgCyan: m => "\x1b[36m" + m + "\x1b[39m\x1b[22m",
  FgWhite: m => "\x1b[37m" + m + "\x1b[39m\x1b[22m",
};

const getSize = code => (code.length / 1024).toFixed(2) + "kb";

function removeDirectory(dir) {
  if (fs.existsSync(dir)) {
    fs.rmdirSync(dir, { recursive: true });
  }
}

function createDirectoryIfNotExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

function writeFile(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, function (err) {
      if (err) return reject(err);
      console.log(colors.FgCyan(path) + " " + getSize(data));
      resolve();
    });
  });
}

function buildEntry({ input, plugins, output }) {
  return rollup({ input, plugins })
    .then(bundle => bundle.generate(output))
    .then(bundle => bundle.output[0].code) // get code
    .then(code => writeFile(output.file, code)); // write file and log size
}

function build(configs) {
  const total = configs.length;
  let index = 0;

  removeDirectory(outDir);
  createDirectoryIfNotExists(outDir);

  const next = () => {
    buildEntry(configs[index])
      .then(() => {
        index++;
        if (index < total) next();
      })
      .catch(error => console.log(error));
  };

  next();
}

build(configs);
