'use strict';

const expect = require('chai').expect,
    fail = expect.fail,
    mockery = require('mockery'),
    ApplicationGenerationError = require('../../lib/generator/application_generator').ApplicationGenerationError;

describe('ApplicationGenerator',() => {
    var execMock, generateApplication;
    before(function(){
        mockery.enable();
        execMock = {
            execSync: function(stub1, stub2){
                console.log('Mocking the execution of the command: '+stub1);
            }
        }

        mockery.registerMock('child_process', execMock);

        generateApplication = require('../../lib/generator/application_generator').generate
    });

    after(function(){
        mockery.disable();
    });

    describe('#generate', () => {
        describe('when the .yo-rc.json exists in the given directory', () => {
            it('the application is generated', () =>{
                var fsMock = {
                    existsSync: function(args){
                        return true;
                    }
                };
                generateApplication('directory');
            });
        });
        describe('when the .yo-rc.json does not exist in the given directory', () => {
            it('the exception ApplicationGenerationError is thrown', () => {
                try{
                    generateApplication('emptyDirectory');
                    fail();
                }catch(error){
                    expect(error.message).to.eq('The .yo-rc.json file does not exist in the directory \'emptyDirectory\'');
                }
            });
        });
        describe('when the directory is not set', () => {
            it('the exception DirectoryException is thrown', () =>{
                try{
                    generateApplication('');
                } catch(error){
                    expect(error.message).to.eq('No directory defined to generate the application');
                }
            });
        });
    });
});