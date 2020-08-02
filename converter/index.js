const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const yaml = require('yaml');
const { csvParse } = require('d3-dsv');

const rawDir = path.resolve('./data/raw');
const outDir = path.resolve('./data/dataset');
const clubs = yaml.parse(fs.readFileSync(path.resolve('./data/frames/clubs.yml'), 'utf8'));
const dict = yaml.parse(fs.readFileSync(path.resolve('./data/frames/dict.yml'), 'utf8'));
const files = fs.readdirSync(rawDir);
const stringFileds = ['name', 'fullname', 'id', 'category', 'license'];

if (fs.existsSync(outDir)) {
  rimraf.sync(outDir);
}
fs.mkdirSync(outDir);

files.forEach((file) => {
  const src = fs.readFileSync(path.join(rawDir, file), 'utf8');
  const data = csvParse(src, (row) => {
    const club = clubs[clubs.map(({ id }) => id).indexOf(row.id)];
    const obj = { slug: club.slug, name: club.short_name };

    for (let key in dict) {
      if (!row.hasOwnProperty([dict[key]])) continue;
      obj[key] = stringFileds.includes(key) ? row[dict[key]] : parseFloat(row[dict[key]]);
    }
    obj.id = `${club.slug}${obj.year}`;
    obj.fullname = club.name;

    return obj;
  });
  data.forEach((datum) => {
    const { slug, year } = datum;
    const dirPath = path.join(outDir, slug);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
    fs.writeFile(path.join(dirPath, `${year}.yml`), yaml.stringify(datum), (err) => {
      if (err) throw err;
      console.log(slug, year, 'export');
    });
  });
});
