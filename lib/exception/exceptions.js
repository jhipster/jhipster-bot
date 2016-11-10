'use strict';
module.exports = {
  DirectoryException: DirectoryException,
  AuthenticationException: AuthenticationException
};

function DirectoryException(message) {
   this.message = message;
   this.toString = function() {
      return  this.message;
   };
}

function AuthenticationException(message) {
   this.message = message;
   this.toString = function() {
      return  this.message;
   };
}