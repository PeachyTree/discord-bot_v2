exports.run = (bot, message, args, func) => {

     async function purge() { 
        message.delete(); 

        if (!message.member.roles.find("name", "bot-commander")) { 
            message.channel.send("You need the \`bot-commander\` role to use this command."); 
            return; 
        }

        if (isNaN(args[0])) {
            message.channel.send('Please use a number as your arguments. \n Usage: ' + prefix + 'purge <amount>'); //\n means new line
            return;
        }

        const fetched = await message.channel.fetchMessage({limit: args[0]}); 
        console.log(fetched.size + " message found, deleting..."); 

        // Deleting the messages
        message.channel.bulkDelete(fetched)
            .catch(error => message.channel.send(`Error: ${error}`)); 

    }

    purge(); // Make sure this is inside the if(msg.startsWith)
}
