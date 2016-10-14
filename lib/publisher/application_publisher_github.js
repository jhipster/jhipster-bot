'user strict';

const git = require('simple-git'),
    AUTH_TOKEN = require('../configuration.json').git_auth_token,
    GIT_NAME = require('../configuration.json').git_name,
    GIT_EMAIL = require('../configuration.json').git_email;

var GitHubApi = require('github');
var github = new GitHubApi(
{
    debug: true
});

module.exports = {
  initialPublish:   initialPublish,
  authentification: authentification,
  createRepository: createRepository,
  pushToRepository: pushToRepository
};

function initialPublish(repositoryPath, repositoryName){
    authentification();
    createRepository(repositoryName);
    pushToRepository(repositoryPath, repositoryName);
};

function authentification(){
    github.authenticate({
        type: "oauth",
        token: AUTH_TOKEN
    });
};
function createRepository(repositoryName){
    github.repos.create({
        name: repositoryName
    });
};
function pushToRepository(repositoryPath, repositoryName){
    git(repositoryPath)
        .init()
        .addConfig('user.name', GIT_NAME)
        .addConfig('user.email', GIT_EMAIL)
        .add('./*')
        .commit("Initial commit of your JHipster project!")
        .addRemote('origin', 'https://'+GIT_NAME+':'+AUTH_TOKEN+'@github.com/'+GIT_NAME+'/'+repositoryName+'.git')
        .push('origin', 'master');
};
