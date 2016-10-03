**WARNING** This project isn't released yet, it is **not** working

The JHipster Bot is a Slack bot for generating JHipster applications.

Initial roadmap is:

- Use [https://github.com/howdyai/botkit](Botkit) to develop the Bot
- Generate a full application using a Bot conversation: the questions/answers are done by the Bot, it generates a `.yo-rc.json` file, and then runs JHipster to create the application
- Connect to GitHub: the Bot has the right to create a repo in the user's GitHub account, and will commit the generated application in this repo. It will then mention the user, telling him his application is ready.

Future roadmap:

- Add sub-generators, like the entity sub-generator
- Support other Bot platforms
