'use strict';

const fs = require('fs');

module.exports = {
  write: write
};

/**
 * args: {
 *   directory: string,
 *   content: Object
 * }
 */
function write(args) {
  var applicationDescriptor =
  {
    "generator-jhipster": args.content
  }
  var fileName = '.yo-rc.json';
  if(args.directory && !fs.existsSync(args.directory)){
    fs.mkdirSync(args.directory);
    fileName = args.directory + '/' + fileName;
  }

  fs.writeFileSync(fileName, JSON.stringify(applicationDescriptor), null, '  ');
}