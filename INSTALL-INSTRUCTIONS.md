# Installation Instructions

1. Install Node Version Manager.

   _Linux/Mac:_ [nvm](https://github.com/creationix/nvm)
   ```
   sudo curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
   ```

   _Windows:_ [nvm-windows](https://github.com/coreybutler/nvm-windows/wiki)

   Download and run [the installer](https://github.com/coreybutler/nvm-windows/releases/download/1.1.1/nvm-setup.zip), accepting the defaults. It will end up under `C:\Users\\_&lt;username&gt;_\AppData\Roaming\nvm` with a symlink under `C:\Program Files\nodejs`.

2. Install [Node.js](https://nodejs.org/en/blog/release/v6.9.5/).

   _Linux/Mac:_
   ```
   nvm install v6.9.5
   nvm alias default v6.9.5
   ```

   _Windows:_
   ```
   nvm install v6.9.5
   nvm use 6.9.5
   ```

3. Install [alexa-app-server](https://github.com/matt-kruse/alexa-app-server) (currently works with 3.0.1).

   _Linux/Mac:_

   (these instructions assume `/usr/local` and refer to `/usr/local/node_modules/alexa-app-server` as `$ALEXA_HOME`):
   ```
   cd /usr/local
   npm install alexa-app-server
   ```

   _Windows:_

   (these instructions refer to `C:\Program Files\nodejs\node_modules\alexa-app-server` as `$ALEXA_HOME`):
   ```
   cd C:\Program Files\nodejs
   npm install alexa-app-server
   ```

   This command will create a node_modules subdirectory and download the alexa-app-server and its dependencies.

4. Make any changes to `$ALEXA_HOME/examples/server.js` to reflect your environment (like the listening port). Refer to the [documentation](https://www.npmjs.com/package/alexa-app-server) for the available settings. You can also comment out (or delete) the `.preRequest` and `.postRequest` lines. Here's a sample `server.js`:
   ```
   var AlexaAppServer = require("../index.js");

   AlexaAppServer.start({
      server_root: __dirname,
      app_root: "alexa",
      port: 8080
   });
   ```

5. Install kodi-alexa.

   Either clone this repository into your alexa-app-server apps directory:
   ```
   cd $ALEXA_HOME/examples/apps
   git clone https://github.com/natedawg92/kodi-alexa.git
   ```

   or download the current master branch as a [ZIP file](https://github.com/natedawg92/kodi-alexa/archive/master.zip) and extract it into your alexa-app-server apps directory. 

   Either way, you should now have a subdirectory under $ALEXA_HOME/examples/apps containing the skill source code.

6. Install any missing dependencies (node-kodi, log-timestamp, etc.). This will create another node_modules directory under $ALEXA_HOME/examples/apps/kodi-alexa with the prerequisite modules:

   ```
   cd $ALEXA_HOME/examples/apps/alexa_tivo_control
   npm install
   ```

7. Copy `$ALEXA_HOME/examples/apps/kodi-alex/examples/example_config.json` to `$ALEXA_HOME/examples/apps/kodi-alexa/config.json`:

   _Linux:_
   ```
   cp examples/example_config.json config.json
   ```

   _Windows:_
   ```
   copy examples\example_config.json config.json
   ```

   Edit this new config.json file and make the following changes:
   ```
   "name": replace <kodi name> with the name of your Kodi instance (ex. "Family Room" or "Man Cave", in double quotes)
   "url": replace <IP address:port> with the IP address and port number of the Kodi (ex. "192.168.0.12:8080", also in double quotes)
   "user": replace <username> with your chosen kodi username or leave as empty blank double quotes ("") if you haven't set one.
   "password": replace <password> with your chosen kodi password or leave as empty blank double quotes ("") if you haven't set one.
   ```
   
   _Note:_ if you want to control more than one Kodi instance, see the advanced setup instructions [here](NOT CREATED YET!!!).

8. Start the alexa-app-server:
   ```
   cd $ALEXA_HOME/examples
   node server.js
   ```

   You should see the Kodi Alexa app registered as an endpoint in the console log:
   ```
   Serving static content from: public_html
   Loading server-side modules from: server
   Loaded /usr/local/alexa-app-server/examples/server/login.js
   Loading apps from: apps
   [2017-01-02T02:31:49.732Z] Now controlling: Office (192.168.1.73).
   [2017-01-02T02:31:49.733Z]    Loaded app [kodi-alexa] at endpoint: /alexa/kodi-alexa
   [2017-01-02T02:31:49.735Z]    Loaded app [hello_world] at endpoint: /alexa/helloworld
   [2017-01-02T02:31:49.736Z]    Loaded app [number_guessing_game] at endpoint: /alexa/guessinggame
   [2017-01-02T02:31:49.738Z] Listening on HTTP port 8080
   ```

   _Linux Tip:_ check out [this init script](https://github.com/chovy/node-startup/blob/master/init.d/node-app) if you want to have your alexa-app-server start automatically, run in the background, and log the console output to a file. If you're using systemd, look [here](https://github.com/jradwan/alexa_tivo_control/issues/34) for an example startup script.

   _Windows Tip:_ check out the [Non-Sucking Service Manager](http://nssm.cc/) for running the alexa-app-server as a service under Windows.

   _General Tip #1:_ you can delete the helloworld and guessinggame directories (under $ALEXA_HOME/examples/apps) if you don't want those skills to run on your alexa-app-server.

   _General Tip #2:_ you may also want to edit/customize the index.html file in the $ALEXA_HOME/examples/public_html folder.

9. Enable the network remote control on Kodi (under System > Services > Control) here is where you can set the port, username and password used in the configuration as described in step 7.

10. In a browser, open the kodi alexa endpoint on your alexa-app-server (ex. http://localhost:8080/alexa/kodi-alexa) and you should see the Alexa Tester page. Here you can set the "Type" field to "IntentRequest", choose an "Intent" (i.e., Help) from the dropdown menu, and click "Send Request" to trigger the intent.

    You can test the other intents (such as launching the Addons) on this page to confirm your configuration settings.
   
11. In order to link Kodi Alexa to your Alexa device, you'll need an [Amazon Developer](https://developer.amazon.com/home.html) account and your alexa-app-server _must_ be available over the public internet via SSL (HTTPS). In the Alexa Skills Kit area of the developer console, click "Add a New Skill." Name your skill (ex. TiVo Control) and set an invocation name (ex. tivo).

    _Note:_ For most people who have a dynamic IP address it is recommended to use a Dynamic Domain Name Service (DDNS) a quick search online will return a few good and free examples. 
    

12. On the Interaction Model page, copy in the "Intent Schema" and "Sample Utterances" text from the corresponding fields on the Alexa Tester page (see step 10).


      _Note:_ if you have not manually applied [this pull request](https://github.com/alexa-js/alexa-utterances/pull/24) to [alexa-utterances](https://github.com/alexa-js/alexa-utterances), you'll need to manually replace the + signs in the generated utterances to their corresponding curly braces (see issue #[24](https://github.com/jradwan/alexa_tivo_control/issues/24) for more details).

    [TO DO: INSERRT SLOT DEATILS HERE]

     Save the interaction model and click Next to move on to the next page.

13. On the Configuration page you have two Endpoint options for directing the skill to your alexa-app-server:


      _HTTPS_ (recommended): requires an SSL certificate ([self-signed](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/testing-an-alexa-skill#create-a-private-key-and-self-signed-certificate-for-testing), [letsencrypt](https://letsencrypt.org/), etc.). Fill in the URL of your alexa-app-server and TiVo Control endpoint (see screenshot above for an example). Remember the URL _must_ be accessible via HTTPS over the public internet (setting that up is outside the scope of this document, but see [here](https://github.com/jradwan/alexa_tivo_control/issues/14) for some discussion/tips and check the "Enabling HTTPs" section of the alexa-app-server [README](https://github.com/alexa-js/alexa-app-server/blob/master/README.md)).

      _Lambda_: if you can't (or don't want to) use your own SSL/HTTPS setup, you can follow the instructions [here](https://community.home-assistant.io/t/aws-lambda-proxy-custom-alexa-skill-when-you-dont-have-https/5230) to create a Lambda function that will proxy HTTPS traffic from the skill to your alexa-app-server over plain HTTP, eliminating the need to get a certificate. See [here](https://github.com/jradwan/alexa_tivo_control/issues/14#issuecomment-280893207) for more details. 

14. Save the skill. Copy the "Application Id" from the "Skill Information Page" into the alexaAppId attribute in the config.json file (from step 7 above) and restart your alexa-app-server.

15. On the Test page, enter a sample utterance (ex. pause) and click "Ask TiVo Control." If your setup is correct, the Alexa skill on the Amazon servers will send a JSON request to your endpoint and a response should be received.

16. The skill should now be active on your developer account (as a skill in test mode). You can confirm this by looking at the "Your Skills" page on your Alexa web page or app. Test it out by asking Alexa to control your KOdi and watch the magic happen!

      If you don't have a physical Alexa-enabled device (like an Echo, Dot, or Tap), check out [echosim.io](https://echosim.io), the Alexa Skill Testing Tool that simulates an Echo in your browser.

17. (optional) Having your alexa-app-server available to the public internet means anyone could theoretically control your TiVo through the Alexa Tester. Once you have confirmed the skill is working, both via the Tester and the Alexa Skills page, you should enable verification in alexa-app-server by adding the debug and verify lines shown below to your server.js file:
      ```
      var AlexaAppServer = require("../index.js");

      AlexaAppServer.start({
         server_root: __dirname,
         app_root: "alexa",
         port: 8080,
         debug: false,
         verify: true
      });
      ```   

      This will enable the [alexa-verifier-middleware](https://github.com/alexa-js/alexa-verifier-middleware) which will verify that any HTTP requests sent to the skill are coming from Amazon. This also disables the Alexa Tester so if you attempt to access your endpoint from a browser once enabling verification, you'll see this:
      ```
      {"status":"failure","reason":"The signaturecertchainurl HTTP request header is invalid!"}
      ```
      You can turn the tester back on when needed by temporarily commenting out the debug and verify lines in server.js:
      ```
      var AlexaAppServer = require("../index.js");

      AlexaAppServer.start({
         server_root: __dirname,
         app_root: "alexa",
         port: 8080,
         //debug: false,
         //verify: true
      });
      ```   

      _Note_: If you chose to use the Lambda HTTPS proxy as your endpoint in step 13, you can't use the verifier.