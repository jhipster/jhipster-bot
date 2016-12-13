'use strict';

angular.module('angularPassportApp')
  .controller('NavbarCtrl', function ($scope, Auth, Session, $window, $location, $http) {
    $scope.authMenu = [{
      "title": "Generate your JHipster application",
      "link": "generator"
    }];

    $scope.urlGithub = 'http://localhost:9000/auth/github';
    $scope.redirectLink = function(){
        $window.open($scope.urlGithub, '_self');
    }

    $scope.logout = function() {
      Auth.logout(function(err) {
        if(!err) {
          $location.path('/');
        }
      });
    };
  });
