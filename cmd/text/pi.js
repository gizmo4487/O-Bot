const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("pi")
		.setDescription("Make O-Bot say something"),
	async execute(interaction) {
		await interaction.reply("Pipi? Pipi-pipipipipi!");
	},
};
