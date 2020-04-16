// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

exports.run = (bot, message, args, func) => {

     // Delete the message that the user sends
     message.delete();

     if (msg === prefix + "HOOK") {
         return func.hook(message.channel, "Hook Usage", `§{prefix}hook <title>, <message>, [HEXcolor], [avatarURL]\n\n**<> is required\n[] is optional**`, "FC8469", "https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png") // Rememeber that \n means new line. This is also using a custome HEX color and image id.
     }

     let hookArgs = message.content.slice(prefix.length + 4).split(","); // This slices the first 6 letters (prefix & the word hook) then splits them by "commas"

     func.hook(message.channel, hookArgs[0], hookArgs[1], hookArgs[2], hookArgs[3]); // This is where it actually calls the hook.

 }
