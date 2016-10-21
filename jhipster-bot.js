'user strict';
const constants = require('./lib/constants'),
       appDescriptorWriter = require('./lib/export/app_description_file_writer'),
       appGenerator = require('./lib/generator/application_generator'),
       appPublisher = require('./lib/publisher/application_publisher_github');

var validator = require('./lib/validator'),
    isChoiceValid = validator.isChoiceValid,
    isAppPackageValid = validator.isAppPackageValid,
    isAppNameValid = validator.isAppNameValid;


var Botkit = require('botkit');

var controller = Botkit.slackbot({
    debug:true,
    interactive_replies: true
});


// Connect the bot to a stream of messages
controller.spawn({
    token: process.env.token
}).startRTM();

//Default application description
var application = {
        "jhipsterVersion": "3.8.0",
        "baseName": "jhipster",
        "packageName": "com.jhipster",
        "packageFolder": "com/jhipster",
        "serverPort": "8080",
        "authenticationType": "session",
        "hibernateCache": "ehcache",
        "clusteredHttpSession": false,
        "websocket": false,
        "databaseType": "sql",
        "devDatabaseType": "h2Disk",
        "prodDatabaseType": "",
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
        ]
};


controller.hears('hello',['direct_message','direct_mention','mention'],function(bot,message) {
  bot.reply(message,'Hello yourself.');
});

controller.hears(['jhipster'], ['direct_message','direct_mention','mention'], function(bot,message) {
    var askAppType = function(err, convo) {
       convo.ask(createMultipleChoiceQuestion(constants.APP_TYPE_QUESTION, constants.APP_TYPE_CHOICES),
        function(response, convo){
            processChoice(response, convo, (v =>{application.applicationType = v;}), constants.APP_TYPE_CHOICES);
            askAppName(response, convo);
            convo.next();
        });
    };

    var askAppName = function(response, convo) {
      convo.ask(constants.APP_NAME_QUESTION, function(response, convo) {
        processResponse(response, convo, isAppNameValid, (v => {application.baseName=v;}));
        askAppPackage(response, convo);
        convo.next();
      });
    };

    var askAppPackage = function(response, convo) {
      convo.ask(constants.APP_PACKAGE_QUESTION, function(response, convo) {
        processResponse(response, convo, isAppPackageValid, processResponsePackageName);
        askAuthenticationType(response, convo);
        convo.next();
      });
    };

    var askAuthenticationType = function(response, convo){
        convo.ask(createMultipleChoiceQuestion(constants.AUTHENTIFICATION_TYPE_QUESTION, constants.AUTHENTIFICATION_TYPE_CHOICES),
            function(response, convo){
                processChoice(response, convo, (v =>{application.authenticationType = v;}), constants.AUTHENTIFICATION_TYPE_CHOICES);
                askProdDatabase(response, convo);
                convo.next();
            }
        );
    };

    var askProdDatabase = function(response, convo){
        convo.ask(createMultipleChoiceQuestion(constants.PROD_DATABASE_QUESTION, constants.PROD_DATABASE_CHOICES),
            function(response, convo){
                processChoice(response, convo, (v =>{application.databaseType = v;}), constants.PROD_DATABASE_CHOICES);
                if(application.databaseType === 'sql')
                    askProdSQLDatabase(response, convo);
                else
                    askDevDatabase(response, convo);
                convo.next();
            }
        );
    };

    var askProdSQLDatabase = function(response, convo){
        convo.ask(createMultipleChoiceQuestion(constants.PROD_SQL_DATABASE_QUESTION, constants.PROD_SQL_DATABASE_CHOICES),
            function(response, convo){
                processChoice(response, convo, (v =>{application.prodDatabaseType = v;}), constants.PROD_SQL_DATABASE_CHOICES);
                askDevDatabase(response, convo);
                convo.next();
            }
        );
    };

    var askDevDatabase = function(response, convo){
        var choices = constants.DEV_DATABASE_CHOICES;
        if(application.prodDatabaseType === 'mysql')
            choices.push(constants.MYSQL_DATABASE_CHOICES);
        else if(application.prodDatabaseType === 'mariadb')
            choices.push(constants.MARIADB_DATABASE_CHOICES);
        else if(application.prodDatabaseType === 'postgresql')
            choices.push(constants.POSTGRESQL_DATABASE_CHOICES);
        else if(application.prodDatabaseType === 'oracle')
            choices.push(constants.ORACLE_DATABASE_CHOICES);

        convo.ask(createMultipleChoiceQuestion(constants.DEV_DATABASE_QUESTION, choices),
            function(response, convo){
                processChoice(response, convo, (v =>{application.devDatabaseType = v;}), choices);
                askHibernateCache(response, convo);
                convo.next();
            }
        );
    };

    var askHibernateCache = function(response, convo){
        convo.ask(createMultipleChoiceQuestion(constants.HIBERNATE_CACHE_QUESTION, constants.HIBERNATE_CACHE_CHOICES),
            function(response, convo){
                processChoice(response, convo, (v =>{application.hibernateCache = v;}), constants.HIBERNATE_CACHE_CHOICES);
                sayTheEnd(response, convo);
            }
        );
    };


    var sayTheEnd = function(response, convo){
        convo.say('Let me generate your JHipster project...');
        generateAndPublishApplication('dummy');
        convo.say('Ok! I\'m done!');
        convo.stop();
    };

    bot.startConversation(message, askAppType);
});

function generateAndPublishApplication(directory){
    appDescriptorWriter.write(
        {
            directory: directory,
            applicationDescription: { "generator-jhipster" : application }
        }
    );
    appGenerator.generate(directory);
    appPublisher.initialPublish(directory, application.baseName)
};

/**
 * Process the choice from the user
 * @param {Object} response
 * @param {Object} convo - the conversation
 * @param {function: string => void} process - the function use the process the  response
 * @param {Object[]} choices - the list of choices given to the user
 */
var processChoice = function(response, convo, process, choices){
    var choiceNumber = response.text;
    if(isChoiceValid(choiceNumber, choices)){
        /* get the value corresponding to the number */
        var value = choices[choiceNumber-1].value;
        process(value);
    }else{
        convo.say('Please, choose a valid answer.');
        convo.repeat();
    }
};

/**
 * Process the response from the user
 * @param {Object} response
 * @param {Object} convo - the conversation
 * @param {function: string => boolean} isValid - the function use to validate the response
 * @param {function: string => void} process - the function use the process the  response
 */
var processResponse = function(response, convo, isValid, process){
    var responseText = response.text;
    if(isValid(responseText)){
        process(responseText);
    }else{
        convo.say('Please, choose a valid answer.');
        convo.repeat();
    }
};


 function processResponsePackageName(responseText){
    application.packageName = responseText;
    application.packageFolder = responseText.replace('.', '/');
 }

/**
 * Create multiple choice question message
 * @param {string} question
 * @param {array} choices
 */
function createMultipleChoiceQuestion(question, choices){
    return choices.reduce(
        function(accumulateMessage, choice, index, choices){
            return accumulateMessage+'\n' + (index+1) + ') ' + choice.name;
        },
        question
    );
};