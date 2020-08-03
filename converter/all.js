const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const converter = require('./converter');

const rawDir = path.resolve('./data/raw');
const files = fs.readdirSync(rawDir);
const outDir = path.resolve('./data/dataset');

if (fs.existsSync(outDir)) {
  rimraf.sync(outDir);
}
fs.mkdirSync(outDir);

files.forEach((file) => converter(path.join(rawDir, file)));
