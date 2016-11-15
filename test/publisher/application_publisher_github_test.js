'user strict';
const git = require('simple-git');

var GitHubApi = require('github');
var githubApi = new GitHubApi(
{
    debug: true
});
var applicationPublisher = require('./../../lib/publisher/application_publisher_github');
