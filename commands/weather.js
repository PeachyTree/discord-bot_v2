// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const weather = require("weather-js"); // `npm i weather-js`
const Discord = require("discord.js"); 

exports.run = (bot, message, args, func) => {

        weather.find({search: args.join(" "), degreeType: "F"}, function(err, result) { // Make sure you got that args.join part
            if (err) message.channel.send(err); 

            // We also want them to know if a place they enter is invalid.
            if (result === undefined || result.length === 0) {
                message.channel.send("**Please enter a valid location.**") // This tells them that the location they entered is invalid.
                return; // This exists the code so that the rest doesn't run.
            }

            // Variables
            var current = result[0].current; // This is a varable for the current part of the JSON output.
            var location = result[0].location; // This is a variable for the location part of the JSON output.

            // Let's use an embed for this.
            const embed = new Discord.RichEmbed()
                .setDescription(`**${current.skytext}**`) // This is the text of what they sky looks like.
                .setAuthor(`Weather for ${current.observationpoint}`) // This shows the current location of the weather.
                .setThumbnail(current.imageURL) // This sets the thumbnail of the embed
                .setColor(0x00AE86) // This sets the color of the embed, you can chnage this to whatever you want, if you use a hex editor, make sure to put 0x in front of it.
                .addField('Timezone',`UTC${location.timezone}`, true) // This is the first field, it shows the timezone.
                .addField('Degree Type',location.degreetype, true) // This is the filed that shows the degree type, and its inline.
                .addField('Temperature',`${current.temperature} Degrees`, true)
                .addField('Feels Like', `${current.feelslike} Degrees`, true)
                .addField('Winds',current.winddisplay, true)
                .addField('Humidity', `${current.humidity}%`, true)

                // Now, lets display it when called
                message.channel.send({embed});

        });
}
