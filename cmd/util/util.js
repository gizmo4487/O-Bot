function randomHex() {
	let hex = "";
	let randNum = 0;
	randNum = Math.floor(Math.random() * Math.floor(41));
	if (randNum < 16) {
		hex = "0" + randNum.toString(16);
	} else {
		hex = randNum.toString(16);
	}

	return hex;
}

module.exports = { randomHex };
