'use strict';

angular.module('angularPassportApp')
  .factory('ApplicationDescriptionBuilder', function() {
    return {
                build : function (application){
                   var applicationDescription = {
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
                        "useSass": false,
                        "applicationType": "monolith",
                        "testFrameworks": [
                          "gatling"
                        ],
                        "jhiPrefix": "jhi",
                        "enableTranslation": false,
                        "serviceDiscoveryType": false
                   };

                   //Application Description
                   applicationDescription.applicationType = application.applicationType;

                   //Application Base name
                   applicationDescription.baseName = application.baseName;

                   //Package Name
                   applicationDescription.packageName = application.packageName;
                   applicationDescription.packageFolder = application.packageName.replace('.', '/');

                   //Authentication Type
                   applicationDescription.authenticationType = application.authenticationType;

                   //Database Type
                   applicationDescription.databaseType = application.databaseType;

                   //Hibernate Cache
                   applicationDescription.hibernateCache = application.hibernateCache;

                   //Build Tool
                   applicationDescription.buildTool = application.buildTool;

                   //Lib Sass
                   applicationDescription.useSass = application.useSass;

                   //Language
                   applicationDescription.enableTranslation = application.enableTranslation;
                   applicationDescription.nativeLanguage = application.nativeLanguage;
                   applicationDescription.languages = application.languages;
                   //applicationDescription.languages.push(applicationDescription.nativeLanguage);

                   return { "generator-jhipster" : applicationDescription};
               }
           };
  })
