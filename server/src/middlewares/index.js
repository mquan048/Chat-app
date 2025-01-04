import fs from 'fs';

const allModules = {};

fs.readFileSync(__dirname + '/').forEach(function (file) {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    const name = file.replace('.middleware.js', '') + 'Middleware';
    allModules[name] = require('./' + file);
  }
});

export default allModules;
