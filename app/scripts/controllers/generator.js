'use strict';
//import constants from '../../../lib/constants';

angular.module('angularPassportApp')
  .controller('GeneratorCtrl', function ($scope, ApplicationDescriptionBuilder, Constants, $http, $location) {
    $scope.error = {};
    $scope.application = {};
    $scope.result = {};

    $scope.questionAppName = Constants.APP_NAME_QUESTION;

    $scope.questionAppPackage = Constants.APP_PACKAGE_QUESTION;

    $scope.questionAppType = Constants.APP_TYPE_QUESTION;
    $scope.listAppType = Constants.APP_TYPE_CHOICES;

    $scope.questionAuthenticationType = Constants.AUTHENTICATION_TYPE_QUESTION;
    $scope.listAuthenticationType = Constants.AUTHENTICATION_TYPE_CHOICES;

    $scope.questionProdDatabase = Constants.PROD_DATABASE_QUESTION;
    $scope.listProdDatabase = Constants.PROD_DATABASE_CHOICES;

    $scope.questionProdSQLDatabase = Constants.PROD_SQL_DATABASE_QUESTION;
    $scope.listProdSQLDatabase = Constants.PROD_SQL_DATABASE_CHOICES;

    $scope.questionDevDatabase = Constants.DEV_DATABASE_QUESTION;
    $scope.listDevDatabase = Constants.DEV_DATABASE_CHOICES;

    $scope.questionHibernateCache = Constants.HIBERNATE_CACHE_QUESTION;
    $scope.listHibernateCache = Constants.HIBERNATE_CACHE_CHOICES;

    $scope.questionBuildTool = Constants.BUILD_TOOL_QUESTION;
    $scope.listBuildTool = Constants.BUILD_TOOL_CHOICES;

    $scope.questionLibSass = Constants.LIB_SASS_QUESTION;
    $scope.listLibSass = Constants.LIB_SASS_CHOICES;

    $scope.questionLanguage = Constants.LANGUAGE_QUESTION;
    $scope.questionNativeLanguage = Constants.NATIVE_LANGUAGE_QUESTION;
    $scope.questionAdditionalLanguage = Constants.ADDITIONAL_LANGUAGE_QUESTION;
    $scope.listLanguage = Constants.LANGUAGE_CHOICES;

    $scope.yesOrNo = Constants.YES_NO_CHOICES;;

    $scope.generate = function(application) {
        var currentDirectory = 'generatedApplications/repository'+$scope.currentUser.name;
        var generatorBody = {
            directory : currentDirectory,
            applicationDescription : ApplicationDescriptionBuilder.build(application)
        };
        $scope.loading = true;
        $http.post('/generator/application', generatorBody, {})
            .success(function (data, status, headers, config){
                $scope.result = data.message;
                 $http.post('/publisher/directory', {directory : currentDirectory, repositoryName : application.baseName, userName : $scope.currentUser.name}, {})
                    .success(function (data, status, headers, config){
                        $scope.result = data.message;
                    })
                    .error(function(data, status, header, config){
                        $scope.result = data.error.message;
                    });
            })
            .error(function(data, status, header, config){
                $scope.result = data.error.message;
            })
            .finally(function(){
                $scope.loading = false;
            });
    };

  });