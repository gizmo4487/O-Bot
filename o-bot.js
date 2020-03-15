const Discord = require('discord.js');
const auth = require('./auth.json');
var sound;

// Create bot object
const bot = new Discord.Client({autoReconnect:true});

// Display console message when logged in
bot.once('ready', () => {
    console.log('Connected');
});
//bot.on('debug', console.log);
bot.on('message', message => {
    // Prefix is 'o!'
    if (message.content.substring(0, 2) == 'o!') {
        var args = message.content.substring(2).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
		
		// Commands
        switch(cmd) {
			
			// o!help
			case 'help':
				message.channel.send('Commands:\no!help: Display this message\no!pi: Make O speak\no!voice: Make O speak for real');
				break;
			
			// o!pi
			case 'pi':
				message.channel.send('Pipi? Pipi-pipipipipi!');
				break;
				
			// o!voice
			case 'voice':
				play(message, "o_sound/ready.wav");
				break;


            // End of command list
		 }
     }
});

async function play(message, sound){
	try{
		const VC = message.member.voice.channel;
			if(!message.guild){
				message.channel.send("The bot cannot join private voice chats.")
			}
			
			else if(!VC){
				message.channel.send("You are not in a voice channel!");
			}
			
			else if (!VC.permissionsFor(message.client.user).has('CONNECT') || !VC.permissionsFor(message.client.user).has('SPEAK')) {
				message.channel.send('Missing join/speak permissions!');
			 }
			else{
				// Here we try to join the voicechat and save our connection into our object.
				var connection = await VC.join();
				message.channel.send("Playing!");
				const dispatcher = connection.play(sound);
					dispatcher.on("finish", () => {
						message.channel.send("Should be disconnecting now");
						dispatcher.destroy();
						VC.leave();
					})
					.on('error', error => {
						console.error(error);
					});
			}
	
	} catch(error){
		console.log(error);
	}
	
}
bot.login(auth.token);