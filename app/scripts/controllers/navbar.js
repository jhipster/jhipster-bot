'use strict';

angular.module('angularPassportApp')
  .controller('NavbarCtrl', function ($scope, Auth, Session, $location, $http) {
    $scope.authMenu = [{
      "title": "Generate your JHipster application",
      "link": "generator"
    }];

    $scope.logout = function() {
      Auth.logout(function(err) {
        if(!err) {
          $location.path('/');
        }
      });
    };
  });
