const { MessageFlags } = require("discord.js");
const {
	createAudioPlayer,
	createAudioResource,
	getVoiceConnection,
	joinVoiceChannel,
} = require("@discordjs/voice");
const RadioPlayer = require("./RadioPlayer.js");
async function play(interaction, sound) {
	try {
		const member = interaction.member;
		const VC = member.voice.channel;
		if (!VC) {
			return {
				content: "Join a voice channel and try again!",
				flags: MessageFlags.Ephemeral,
			};
		} else {
			var connection = joinVoiceChannel({
				channelId: VC.id,
				guildId: VC.guild.id,
				adapterCreator: VC.guild.voiceAdapterCreator,
			});
			var player = null;
			if (sound.startsWith("http")) {
				player = await RadioPlayer.getAudioPlayer(sound);
				connection.subscribe(player);
			} else {
				console.log("Playing local file");
				var resource = createAudioResource(sound);
				player = createAudioPlayer();
				connection.subscribe(player);
				player.play(resource);
			}
		}
	} catch (error) {
		console.error(error);
		return {
			content:
				"Something went wrong! Do I have permission to join the voice channel and speak?",
			flags: MessageFlags.Ephemeral,
		};
	}
	return "Now speaking in voice channel!";
}

function disconnect(interaction) {
	const connection = getVoiceConnection(interaction.guildId);
	if (connection) {
		connection.destroy();
		return "Bye!";
	} else {
		return {
			content: "Can't disconnect me because I'm not in a voice channel!",
			flags: MessageFlags.Ephemeral,
		};
	}
}
module.exports = { play, disconnect };
