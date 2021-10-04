const fs = require('fs');
const path = require('path');


let packageLocation = path.resolve(`${__dirname}/package.json`);
let packageDestination = path.resolve(`${__dirname}/dist/app`)
fs.copyFileSync(packageLocation, `${packageDestination}/package.json`)