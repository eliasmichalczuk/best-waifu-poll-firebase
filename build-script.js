const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/ngElements/runtime-es5.js',
    './dist/ngElements/polyfills-es5.js',
    './dist/ngElements/main-es5.js'
  ];
  await fs.ensureDir('elements');
  await concat(files, 'elements/best-waifu-poll.js');
})();