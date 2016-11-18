'user strict';

const git = require('simple-git');

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

function initialPublish(repositoryPath, repositoryName, GIT_NAME, AUTH_TOKEN){
    authentification(AUTH_TOKEN);
    createRepository(repositoryName);
    pushToRepository(repositoryPath, repositoryName, GIT_NAME, AUTH_TOKEN);
};

function authentification(AUTH_TOKEN){
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
function pushToRepository(repositoryPath, repositoryName, GIT_NAME, AUTH_TOKEN){
    git(repositoryPath)
        .init()
        .addConfig('user.name', GIT_NAME)
        .add('./*')
        .commit("Initial commit of your JHipster project!")
        .addRemote('origin', 'https://ApiJHipsterLocal:'+AUTH_TOKEN+'@github.com/'+GIT_NAME+'/'+repositoryName+'.git')
        .push('origin', 'master');
};
