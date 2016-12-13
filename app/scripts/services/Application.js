'use strict';

angular.module('angularPassportApp')
  .factory('Application', function ($resource) {
    return $resource('/generator/application');
  });
