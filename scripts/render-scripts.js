'use strict';
const fs = require('fs');
const packageJSON = require('../package.json');
const upath = require('upath');
const sh = require('shelljs');

module.exports = function renderScripts() {

    const sourcePath = upath.resolve(upath.dirname(__filename), '../src/js');
    const destPath = upath.resolve(upath.dirname(__filename), '../dist/.');
    
    sh.cp('-R', sourcePath, destPath)

    // Core JS
    const sourcePathScriptsJS = upath.resolve(upath.dirname(__filename), '../src/js/scripts.js');
    const destPathScriptsJS = upath.resolve(upath.dirname(__filename), '../dist/js/scripts.js');

    // App Js
    const sourcePathAppJS = upath.resolve(upath.dirname(__filename), '../src/js/page.js');
    const destPathAppJS = upath.resolve(upath.dirname(__filename), '../dist/js/page.js');
    
    const copyright = `/*!
* Start Bootstrap - ${packageJSON.title} v${packageJSON.version} (${packageJSON.homepage})
* Copyright 2013-${new Date().getFullYear()} ${packageJSON.author}
* Licensed under ${packageJSON.license} (https://github.com/StartBootstrap/${packageJSON.name}/blob/master/LICENSE)
*/
`
    const scriptsJS = fs.readFileSync(sourcePathScriptsJS);
    const appJS = fs.readFileSync(sourcePathAppJS);
    
    fs.writeFileSync(destPathScriptsJS, copyright + scriptsJS);
    fs.writeFileSync(destPathAppJS, appJS);
};