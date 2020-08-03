const path = require('path');
const converter = require('./converter');

console.log(process.argv);
const file = path.resolve(process.argv[2]);
converter(file);
