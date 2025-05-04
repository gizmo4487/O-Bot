const { SlashCommandBuilder } = require('discord.js');
const vcutil = require('../util/vc.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('radio')
		.setDescription('Play 24/7 SiIvaGunner music in a voice channel'),
	async execute(interaction) {
		const response = await vcutil.play(interaction, 'http://localhost:8000/live');
		await interaction.reply(response);
	},
};
