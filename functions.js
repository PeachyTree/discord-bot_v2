// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

module.exports = { // This basically works like every normal package you use.

    ping: function(channel) { 
        channel.send("Pong!");
    },
    hook: function(channel, title, message, color, avatar) {

    // Reassign default parameters 
    if (!channel) return console.log("Channel not specified.");
    if (!title) return console.log("Title not specified");
    if (!message) return console.log("Message not specified");
    if (!color) color = "d9a744"; 
    if (!avatar) avatar = "https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png" 

    color = color.replace(/\s/g, ''); 
    avatar = avatar.replace(/\s/g, '');

    channel.fetchWebhooks() // This gets the webhooks in the channel
       .then(webhook => {

            // Fetches the webhook we will use for each hook
            let foundHook = webhook.find("name", "Webhook"); 
        
            // This runs if the webhook is not found.
            if (!foundHook) {
                channel.createWebhook("Webhook", "https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png")
                    .then(webhook => {
                        webhook.send('', {
                            "username": title,
                            "avatarURL": avatar,
                            "embeds": [{
                                "color": parseInt(`0x${color}`),
                                "description":message
                            }]
                        })
                            .catch(error => { 
                                console.log(error)
                                return channel.send("**Something went wrong when sending the webhook. Please check out console.**");
                            })
                    })
            } else { 
                foundHook.send('', { 
                    "username": title,
                    "avatarURL": avatar,
                    "embeds": [{
                        "color": parseInt(`0x${color}`),
                        "description":message
                    }]
                })
                    .catch(error => { 
                        console.log(error)
                        return channel.send("**Something went wrong when sending the webhook. Please check out console.**");
                })
        

            }
       })
    }
}
