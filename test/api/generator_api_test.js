var expect = require('chai').expect;
var assert = require('assert');
var request = require('supertest');
var mockery = require('mockery');

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

describe('Generator Router', () => {
    var api, execMock, fsMock;
    beforeEach(() => {
        mockery.enable({
            useCleanCache: true,
            warnOnReplace: false,
            warnOnUnregistered: false
        });
        execMock = {
            execSync: function(stub1, stub2){
                console.log('Mocking the execution of the command: '+stub1);
            },
            fileExists: function(args){
                return true;
            },
            writeFileSync: function(arg1, arg2, arg3, arg4){
                console.log('Mocking fs.writeFileSync');
            }
        };
        mockery.registerMock('child_process', execMock);
        mockery.registerMock('fs', fsMock);

        api = require('../../lib/api/api');
    });

    afterEach(() => {
        api.close();
        mockery.disable();
    });

    describe('When everything goes fine', () => {
        it('the response code to /application is 200 and there is a success message.', () => {
            var body = {
                directory :'testDirectory',
                applicationDescription: application
            };
            request(api)
                .post('/generator/application')
                .send(body)
                .expect(200)
                .end(function(err, res){
                    if(err){
                        throw err;
                    }
                    expect(res.message).to.not.be.undefined;
                });
        });
    });

    describe('The directory parameter is not set', () => {
        it('the response code to /application is 500 and there is an error message', () => {
            var body = {
                directory : '',
                applicationDescription: application
            };
            request(api)
                .post('/generator/application')
                .send(body)
                .expect(500)
                .end(function(err, res){
                    if(err){
                        throw err;
                    }
                });
        });
    });
});