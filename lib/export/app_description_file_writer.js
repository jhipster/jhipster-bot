'use strict';

const fs = require('fs'),
      exec = require('child_process').execSync;

module.exports = {
  write: write,
  remove: remove
};

/**
 * args: {
 *   directory: string,
 *   applicationDescription: Object
 * }
 */
function write(args) {
  var fileName = '.yo-rc.json';
  if(args.directory && !fs.existsSync(args.directory)){
    fs.mkdirSync(args.directory);
    fileName = args.directory + '/' + fileName;
  }

  fs.writeFileSync(fileName, JSON.stringify(args.applicationDescription), null, '  ');
}

/**
 * args: {
 *   directory: string
 * }
 */
function remove(args) {
  exec('rm -rf ' + args.directory);
}