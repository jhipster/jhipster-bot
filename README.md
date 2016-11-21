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

#JHipster API Documentation
##Authentication
**GitHub Authentication**
----
  Authentication of the user via his GitHub account.

* **URL**

  /auth/github

* **Method:**

  `GET`
  
*  **URL Params**

  None

* **Data Params**

  None

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/auth/github",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```


##Generator
**Generate JHipster Application**
----
 Generate a JHipster application.

* **URL**

  /generator/application

* **Method:**

  `POST`
  
*  **URL Params**
  
  None

* **Data Params**

  `{
    directory : [string],
    applicationDescription : [Object]
   }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message : "The JHipster application has been generated."}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error:{code:401,message:"An error has occurred: Authentication needed to access this resource."}}`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/generator/application",
      dataType: "json",
      type : "POST",
      data : "{"
            +"    directory: 'the/repo/directory', "
            +"    applicationDescription: " 
            +"      {	"
            +"        generator-jhipster: "	
            +"          { "
            +"                jhipsterVersion: '3.8.0', "
            +"                baseName: 'jhipster', "
            +"                packageName: 'com.jhipster', "
            +"                packageFolder: 'com/jhipster', "
            +"                serverPort: '8080', "
            +"                authenticationType: 'session', "
            +"                hibernateCache: 'ehcache', "
            +"                clusteredHttpSession: false, "
            +"                websocket: false, "
            +"                databaseType: 'sql', "
            +"                devDatabaseType: 'h2Disk', "
            +"                prodDatabaseType: '', "
            +"                searchEngine: false, "
            +"                messageBroker: false, "
            +"                buildTool: 'maven', "
            +"                enableSocialSignIn: false, "
            +"                rememberMeKey: '59abe5c3abe885fb305b11e8d514304ccd4828c9', "
            +"                useSass: true, "
            +"                applicationType: 'monolith', "
            +"                testFrameworks: [ "
            +"                    'gatling'"
            +"                ],  "
            +"                jhiPrefix: 'jhi', "
            +"                enableTranslation: true,"
            +"                nativeLanguage: 'en', "
            +"                languages: [  "
            +"                    'en', "
            +"                    'fr'  "
            +"                ]"
            +"          }"
            +"      }"
            +"  }",
      success : function(r) {
        console.log(r);
      }
    });
  ```

##Publisher
**Publish on GitHub**
----
  Publish the project on the user's GitHub.

* **URL**

  /publisher/directory

* **Method:**

  `POST`
  
*  **URL Params**

  None

* **Data Params**

  `{
    "directory" : [string],
    "repositoryName" : [string],
    "userName" : [string]
   }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/auth/github",
      dataType: "json",
      type : "POST",
      data : "{"
         +" directory : 'the/repo/directory', "
         +" repositoryName : 'TheRepoName', "
         +" userName : 'MyGitHubAccount' "
      +"}",
      success : function(r) {
        console.log(r);
      }
    });
  ```

##User
**Get User**
----
  Returns json data about a single user.

* **URL**

  /users/:name

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `name=[string] - the name of the user's GitHub account`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : 12, name : "MyGitHubAccount", token : "be2ert56lijn0ijhg76" }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error:{code:401,message:"An error has occurred: Authentication needed to access this resource."}}`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/user/MyGitHubAccount",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ``` 
