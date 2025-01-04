import fs from 'fs';

const allModules = {};

fs.readFileSync(__dirname + '/').forEach(function (file) {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    const name = file.replace('.service.js', '') + 'Service';
    allModules[name] = require('./' + file);
  }
});

export default allModules;
