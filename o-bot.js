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
    if (message.content.substring(0, 2) == 'o!') {
        var args = message.content.substring(2).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
		
		// Commands
        switch(cmd) {
            	// o!ping
            	case 'ping':
                	message.channel.send('Pong!');
            	break;
			
		// o!help
		case 'help':
			message.channel.send('Commands:\no!help: Display this message\no!ping: Test if bot is alive\no!pi: Make O speak');
		break;
		
		// o!pi
		case 'pi':
			message.channel.send('Pipi? Pipi-pipipipipi!');
			break;
            // End of command list
         }
     }
});

bot.login(auth.token);