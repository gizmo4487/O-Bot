const { SlashCommandBuilder } = require('discord.js');
const vcutil = require('../util/vc.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Disconnect O-Bot from the voice channel'),
	async execute(interaction) {
		const response = await vcutil.disconnect(interaction);
		await interaction.reply(response);
	},
};
