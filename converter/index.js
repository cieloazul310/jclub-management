const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const { csvParse } = require('d3-dsv');

const rawDir = path.resolve('./data/raw');
const outDir = path.resolve('./data/dataset');
const clubs = yaml.parse(fs.readFileSync(path.resolve('./data/frames/clubs.yml'), 'utf8'));
const dict = yaml.parse(fs.readFileSync(path.resolve('./data/frames/dict.yml')));
const files = fs.readdirSync(rawDir);

files.slice(0).forEach((file) => {
  const src = fs.readFileSync(path.join(rawDir, file), 'utf8');
  /*
  console.log(csvParse(src, (row, index, columns) => {

  }));
  */
});
