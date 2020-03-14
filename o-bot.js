const Discord = require('discord.js');
const auth = require('./auth.json');

// Create bot object
const bot = new Discord.Client({autoReconnect:true});

// Display console message when logged in
bot.once('ready', () => {
    console.log('Connected');
});
bot.on('message', message => {
    // Prefix is '!'
    if (message.content.substring(0, 1) == '!') {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
		
		// Commands
        switch(cmd) {
            	// !ping
            	case 'ping':
                	message.channel.send('Pong!');
            	break;
			
		// !help
		case 'help':
			message.channel.send('Commands:\n!help: Display this message\n!ping: Test if bot is alive\n!pi: Make O speak');
		break;
		
		// !pi
		case 'pi':
			message.channel.send('Pipi? Pipi-pipipipipi!');
			break;
            // End of command list
         }
     }
});

bot.login(auth.token);