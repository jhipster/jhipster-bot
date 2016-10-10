'use strict';
module.exports = {
  DirectoryException: DirectoryException
};

function DirectoryException(message) {
   this.message = message;
   this.toString = function() {
      return  this.message;
   };
}