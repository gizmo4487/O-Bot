var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Create bot object
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

// Display console message when logged in
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Prefix is '!'
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
		
		// Commands
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
			
			// !help
			case 'help':
				bot.sendMessage({
					to: channelID,
					message: 'Commands:\n!help: Display this message\n!ping: Test if bot is alive\n!pi: Make O speak'
				});
			break;
			
			// !pi
			case 'pi':
				bot.sendMessage({
					to: channelID,
					message: 'Pipi? Pipi-pipipipipi!'
		
				})
			break;
            // End of command list
         }
     }
});