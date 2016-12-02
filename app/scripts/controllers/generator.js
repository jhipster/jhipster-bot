'use strict';

angular.module('angularPassportApp')
  .controller('GeneratorCtrl', function ($scope, $http, $location) {
    $scope.error = {};
    $scope.application = {};
    $scope.result = {};

    $scope.generate = function(application) {
        var currentDirectory = 'generatedApplications/repository'+$scope.currentUser.name;
        var applicationDescription = {
            directory : currentDirectory,
            applicationDescription : {
               "generator-jhipster": {
                 "jhipsterVersion": "3.9.1",
                 "baseName": "testBot",
                 "packageName": "com.test.bot",
                 "packageFolder": "com/test/bot",
                 "serverPort": "8080",
                 "authenticationType": "session",
                 "hibernateCache": "no",
                 "clusteredHttpSession": false,
                 "websocket": false,
                 "databaseType": "mongodb",
                 "devDatabaseType": "mongodb",
                 "prodDatabaseType": "mongodb",
                 "searchEngine": false,
                 "messageBroker": false,
                 "buildTool": "maven",
                 "enableSocialSignIn": false,
                 "rememberMeKey": "59abe5c3abe885fb305b11e8d514304ccd4828c9",
                 "useSass": true,
                 "applicationType": "monolith",
                 "testFrameworks": [
                   "gatling"
                 ],
                 "jhiPrefix": "jhi",
                 "enableTranslation": true,
                 "nativeLanguage": "en",
                 "languages": [
                   "en",
                   "fr"
                 ],
                 "serviceDiscoveryType": false
               }
             }
        };
        $http.post('/generator/application', applicationDescription, {})
            .success(function (data, status, headers, config){
                $scope.result = data.message;
                 $http.post('/publisher/directory', {directory : currentDirectory, repositoryName : 'ViaAngularBG', userName : $scope.currentUser.name}, {})
                    .success(function (data, status, headers, config){
                        $scope.result = data.message;
                    })
                    .error(function(data, status, header, config){
                        $scope.result = data.error.message;
                    });
            })
            .error(function(data, status, header, config){
                $scope.result = data.error.message;
            });
    };
  });