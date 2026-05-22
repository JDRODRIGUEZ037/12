const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');
const distMain = path.join(distDir, 'main.js');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fs.writeFileSync(distMain, `require('./src/main.js');\n`);
console.log('Created dist/main.js redirect to dist/src/main.js');
