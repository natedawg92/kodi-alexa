// load required modules
var alexa = require('alexa-app');
var kodi_rpc = require('node-kodi');
require('log-timestamp');

// load configuration parameters
var config = require("./config.json");
var constants = require("./constants.json");

// load settings from config file
var route = config.route || "kodi-alexa";

// Define Kodi Instance variables
var kodiInstanceId = 0;

// Initialise Default Kodi instance (first one in config file)
var kodi = new kodi_rpc({
    url: config.kodis[kodiInstanceId].url,
    user: config.kodis[kodiInstanceId].user,
    password: config.kodis[kodiInstanceId].password,
    debug: config.kodis[kodiInstanceId].debug || false
});

// define an alexa-app
var app = new alexa.app(route);

// verify appId for incoming request
app.pre = function(request,response,type) {
    if (request.hasSession()) {
        var session = request.getSession();
        if (session.details.application.applicationId!=config.alexaAppId &&
            session.details.application.applicationId!=constants.alexaTestAppId) {
            response.fail("An invalid applicationId was received.");
        }
    }
};

// general error handling
app.error = function(exception, request, response) {
    console.log(exception);
    response.say(constants.say_error);
};

// launch Application

app.launch(function(request,response) {
    response.say(constants.say_welcome + constants.say_launch);
});

if ((process.argv.length === 3) && (process.argv[2] === 'schema'))  {
    console.log (app.schema ());
    console.log (app.utterances ());
    console.log (app.schemas.skillBuilder ());
}

// Intents

app.intent('Help',
    {
        "slots":{},
        "utterances":[ "{for|to|} {help|assistance}" ]
    },
    function(request,response) {
        console.log("Help requested, adding card.");
        response.say(constants.say_launch + constants.say_card);
        response.card("Help", constants.card_help);
    }
);

// Functions
function upddatCurrentKodiConfig(kodiIndex)
{
    kodi.setConfiguration({
        url: config.kodis[kodiIndex].url,
        user: config.kodis[kodiIndex].user,
        password: config.kodis[kodiIndex].password,
        debug: config.kodis[kodiIndex].debug || false
    });
}

module.exports = app;
