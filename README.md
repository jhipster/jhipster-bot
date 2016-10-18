**WARNING** This project isn't released yet, it is **not** working

The JHipster Bot is a Slack bot for generating JHipster applications.

#Initial roadmap is:

- Use [Botkit](https://github.com/howdyai/botkit) to develop the Bot
- Generate a full application using a Bot conversation: the questions/answers are done by the Bot, it generates a `.yo-rc.json` file, and then runs JHipster to create the application
- Connect to GitHub: the Bot has the right to create a repo in the user's GitHub account, and will commit the generated application in this repo. It will then mention the user, telling him his application is ready.

#Future roadmap:

- Add sub-generators, like the entity sub-generator
- Support other Bot platforms

#How to try it:

- Create a bot on your Slack team:
  https://my.slack.com/services/new/bot
- Take the API token that slack gives you.
- Setup your configuration
- In the project's root directory use the command
```
node jhipster-bot.js
```
- And start the conversation with your bot in your slack channel by typing `jhipster`

#Setup your configuration:
The configuration can be setup in different ways according to your environment.

##Setup local environment:

on the root of the project, create an oath.json file. The properties are:
- slack_bot_token: the token of your slack bot
- git_auth_token: [the authorization token](https://github.com/settings/tokens) of your GitHub account
- git_name: the name of your GitHub account
- git_email: the email of your GitHub account
 
##Setup Heroku environment:
For the application to work on Heroku you have to set the following environment variables [using the command](https://devcenter.heroku.com/articles/getting-started-with-nodejs#define-config-vars) :
 ```
heroku config:set GIT_NAME=MyGithubAccount
```
- SLACK_BOT_TOKEN: the token of your slack bot
- GIT_AUTH_TOKEN: [the authorization token](https://github.com/settings/tokens) of your GitHub account
- GIT_NAME: the name of your GitHub account
- GIT_EMAIL: the email of your GitHub account

