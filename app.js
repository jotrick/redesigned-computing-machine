var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', new builder.IntentDialog()
    .matches(/^hello/i, 
    [function (session) {
        //session.send("hello_test");
        //session.beginDialog('/askName');
        builder.Prompts.choice(session, "This is your choice...", "Choice 1|Choice 2|Wrong Choice", { listStyle: builder.ListStyle["button"] });
    },
    function (session, results) {
        //session.send('Hello ' + results.response);
        session.send("And your choice was: " + results.response.entity);
    }])
    .matches(/woo/i,
    function (session) {
        session.send("Woo is right! This is very exciting! I need you to say 'hello', though.");
    })
    .onDefault(function (session) {
        session.send("I didn't understand. Say hello to me!");
    })
);

bot.dialog('/askName', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.endDialogWithResult(results);
    }
]);






// bot.dialog('/', function (session) {
//     session.send("Hello World " + session);
// });


// bot.dialog('/', new builder.IntentDialog()
//     .matches(/^hello/i, function (session) {
//         session.send("Hi there!");
//     })
//     .onDefault(function (session) {
//         session.send("I didn't understand. Say hello to me!");
//     }))


// bot.dialog('/', [
//     function (session) {
//         session.beginDialog('/askName');
//     },
//     function (session, results) {
//         session.send('Hello ' + results.response);
//     }
// ]);
// bot.dialog('/askName', [
//     function (session) {
//         builder.Prompts.text(session, 'Hi! What is your name?');
//     },
//     function (session, results) {
//         session.endDialogWithResult(results);
//     }
// ]);



