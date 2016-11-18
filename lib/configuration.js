'user strict';

module.exports = {
    slack_bot_token: process.env.SLACK_BOT_TOKEN || require('../oauth.json')["slack_bot_token"],
    git_client_id:  process.env.GIT_CLIENT_ID || require('../oauth.json')["git_client_id"],
    git_client_secret:  process.env.GIT_CLIENT_SERCRET || require('../oauth.json')["git_client_secret"],
    ps_connection_url: process.env.DATABASE_URL || require('../oauth.json')["ps_connection_url"]
}