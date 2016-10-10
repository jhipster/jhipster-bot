'use strict';

const   DirectoryException = require('../exception/exceptions').DirectoryException,
        exec = require('child_process').execSync,
        fileExists = require('fs').existsSync;

module.exports = {
  generate: generate
};


function generate(directory){
    if(!directory){
        throw new DirectoryException('No directory defined to generate the application');
    }
    if(!fileExists(directory+'/.yo-rc.json')){
        throw new ApplicationGenerationError('The .yo-rc.json file does not exist in the directory \'' + directory+'\'');
    }
    exec('yo jhipster --f', { cwd: directory+'/'});
}

function ApplicationGenerationError(message) {
   this.message = message;
   this.toString = function() {
      return  this.message;
   };
}