const { SlashCommandBuilder } = require('discord.js');
const vcutil = require('../util/vc.js');
const util = require('../util/util.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('voice')
		.setDescription('Make O-Bot join a voice channel and speak')
		.addStringOption(option =>
			option.setName('type')
				.setDescription('Type of voice clip to play')
				.setMaxLength(6)
				.setRequired(false)
				.addChoices(
					{ name: 'Normal', value: 'normal' },
					{ name: 'Alt', value: 'alt' },
					{ name: 'JP', value: 'jp' },
					{ name: 'JP Alt', value: 'jp_alt' },
				)),
	async execute(interaction) {
		const voiceOption = interaction.options.getString('type') ?? 'normal';
		const prefix = 'o_sound' + (voiceOption!='normal'?'/' + voiceOption:'');
		const response = await vcutil.play(interaction, prefix + "/000000" + util.randomHex() + ".wav");
		await interaction.reply(response);
	},
};
