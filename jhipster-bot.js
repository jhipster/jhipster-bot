var Botkit = require('botkit');

var controller = Botkit.slackbot({
    debug:true
});


// Connect the bot to a stream of messages
controller.spawn({
    token: process.env.token
}).startRTM();


// give the bot something to listen for.
controller.hears('hello',['direct_message','direct_mention','mention'],function(bot,message) {

  bot.reply(message,'Hello yourself.');

});