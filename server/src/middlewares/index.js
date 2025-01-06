import fs from 'fs/promises';

const allModules = {};

const files = fs.readdir('./src/middlewares/');
for (const file of files) {
  if (file !== 'index.js') {
    const name = file.replace('.middleware.js', '');
    allModules[name] = import('./' + file);
  }
}

export default allModules;
