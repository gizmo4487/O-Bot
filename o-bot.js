const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const fetch = require('node-fetch');
const fs = require('node:fs');
const path = require('node:path');

// Create bot object
const bot = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
	],
	autoReconnect:true,
});

bot.commands = new Collection();
// Begin slash command setup
const cmdFoldersPath = path.join(__dirname, 'cmd');
const cmdFolders = fs.readdirSync(cmdFoldersPath);

for(const folder of cmdFolders) {
	const cmdPath = path.join(cmdFoldersPath, folder);
	const cmdFiles = fs.readdirSync(cmdPath).filter(file => file.endsWith('.js'));
	for(const file of cmdFiles) {
		const filePath = path.join(cmdPath, file);
		const cmd = require(filePath);
		if('data' in cmd && 'execute' in cmd) {
			console.log('Adding command: ' + cmd.data.name);
			bot.commands.set(cmd.data.name, cmd);
		}
		else {
			console.log('[WARN] The command at ' + filePath + ' is missing a required "data" or "execute" property!');
		}
	}
}
// End slash command setup
// Display console message when logged in
bot.once('ready', () => {
    console.log('O-Bot is ready!');
});

// Reconnecting
bot.on("reconnecting", () => {
	console.log("Reconnecting!");
	});

// Resume
bot.on("resume", () => {
	console.log("Connection restored!");
	});

// Handle slash commands
bot.on(Events.InteractionCreate, async interaction => {
	if(!interaction.isChatInputCommand()) return;

	const cmd = interaction.client.commands.get(interaction.commandName);
	if(!cmd) {
		console.error('No matching command ' + interaction.commandName + ' was found!');
		return;
	}

	try {
		await cmd.execute(interaction);
	}
	catch(error) {
		const errorMsg = `Uh-oh...something went wrong. Try again later!`;
		console.error(error);
		if(interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: errorMsg,
				flags: MessageFlags.Ephemeral
			});
		}
		else {
			await interaction.reply({
				content: errorMsg,
				flags: MessageFlags.Ephemeral
			});
		}
	}
});
bot.login(process.env.TOKEN);
