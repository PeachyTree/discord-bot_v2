// Calling packages
const Discord = require("discord.js");
const bot = new Discord.Client();
const weather = require("weather-js"); // Make sure you call the packages you install.
const fs = require("fs"); // But we also need to require the fs package.

// We can call the file with all funcrions here
const func = require("./functions.js"); // If this returns an error for you (or you might be on linux/ubuntu), try '../functions.js'...
// You can also change the name of func to something else, like tools.

// We can call the JSON file here
const commands = JSON.parse(fs.readFileSync("Storage/commands.json", "utf8"));

// Global setings 
const prefix = "~"; // This is the prefix, you can change this to wahetever you want.

// Listener Event: Runs whenever a message is received.
bot.on("message", message => {

    // Variables - Variables make it easy to call things, since it rquires less typing.
    let msg = message.content.toUpperCase(); // This variable takes the message and turns it all Uppercase.
    let sender = message.author; // This variable takes the message, and finds who the author is.
    let args = message.content.slice(prefix.length).trim().split(" "); // This variable slices off the prefix.
    let cmd = args.shift().toLowerCase(); // This takes away the first object in the cont array, then puts it in this. 

    // We also need to make sure that it doesnt read messages from the bot.
    if (sender.bot) return;
    if (!message.content.startsWith(prefix)) return; // We also want to make it so that if the message does not start with the prefix, return,

    // Command Handler - .trim() removes the blank spaces on both sides of the string
    try {
        let commandFile = require(`./commands/${cmd}.js`); // This will assign that filename to commandFile.
        commandFile.run(bot, message, args, func); // This will try to run that file.
    } catch(e) { // If an error occurs, this will run.

        console.log(e.message); // This logs the error message.

    } finally { // This will run after the first two clear up.

        console.log(`${message.author.username} ran the command: ${cmd}`); 

    }  

});

// Listener Event: Runs whenever the bot sends a ready event (when it first starts for example)
bot.on("ready", () => {
    // We can post into console that the bot launched.
    console.log("Bot started.")
});

// Ignore this, it only hides my login token. Example: bot.login("<token>");
//#region 
    bot.login("NTM1ODA2MDYwMTQ1OTM0MzU4.DyNgFQ.VKxJaRoy0FXHhQCLiDVeVINFiBM");
    //#endregion 
