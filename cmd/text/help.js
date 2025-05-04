const { EmbedBuilder, MessageFlags, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Show the help page'),
	async execute(interaction) {
		const embed = new EmbedBuilder()
  			.setTitle("O-Bot Help")
  			.setDescription("Type `/` to view a list of commands.")
  			.addFields(
    				{
      					name: "Commands",
     					value: "`/pi`: Make O-Bot say something in text chat\n\n`/voice [type]`: Make O-Bot join the voice channel you're currently in and speak. `type` can be `Normal`, `Alt`, `JP`, or `JP Alt`.\nIf left blank, the default is `Normal`.\n\n`/radio`: Enjoy listening to high-quality rips all day long with a 24/7 radio featuring SiIvaGunner's finest! Also available [here](https://radio.gizmo4487.dev).\n\n`/leave`: Disconnect O-Bot from the voice channel\n\n`/help`: Show this page",
      					inline: false
    				},
    				{
      					name: "YouTube",
      					value: "[gizmo4487](https://youtube.com/@gizmo4487)",
      					inline: true
    				},
    				{
      					name: "Twitch",
      					value: "[notengonombreusario](https://twitch.tv/notengonombreusario)",
      					inline: true
    				},
  			)
  			.setColor("#ffe511")
  			.setFooter({
    				text: "Created by gizmo4487",
    				iconURL: "https://gizmo4487.dev/O.jpg",
  			});

		await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
	},
};
