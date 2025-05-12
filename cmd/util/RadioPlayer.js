const {
	createAudioResource,
	createAudioPlayer,
	NoSubscriberBehavior,
} = require("@discordjs/voice");
class RadioPlayer {
	static audioPlayer = null;

	static async getAudioPlayer(url) {
		if (this.audioPlayer == null) {
			let data = await fetch(url, {
				headers: {
					"User-Agent": "O-Bot",
				},
			});
			if (data.status == 200) {
				console.log("Creating audio resource");
				var fileStream = data.body;
				var res = createAudioResource(fileStream, {
					inlineVolume: true,
				});
				this.audioPlayer = createAudioPlayer({
					behaviors: { noSubscriber: NoSubscriberBehavior.Play },
				});
				this.audioPlayer.play(res);
				return this.audioPlayer;
			} else {
				throw Error("Radio is down!");
			}
		} else {
			return this.audioPlayer;
		}
	}
}
module.exports = RadioPlayer;
