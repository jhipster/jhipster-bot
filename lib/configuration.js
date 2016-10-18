'user strict';

module.exports = {
    slack_bot_token: process.env.SLACK_BOT_TOKEN || require('../oauth.json')["slack_bot_token"],
    git_auth_token:  process.env.GIT_AUTH_TOKEN || require('../oauth.json')["git_auth_token"],
    git_name:   process.env.GIT_NAME || require('../oauth.json')["git_name"],
    git_email:  process.env.GIT_EMAIL || require('../oauth.json')["git_user"]
}