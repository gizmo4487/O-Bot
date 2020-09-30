const Discord = require('discord.js');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Constants = require('discord.js/src/util/Constants.js');
const fs = require('fs');
Constants.DefaultOptions.ws.properties.$browser='Discord Android';
const auth = require('./auth.json');
var sound;
const {exec} = require("child_process");

// Create bot object
const bot = new Discord.Client({autoReconnect:true});

// Display console message when logged in
bot.once('ready', () => {
    console.log('O-Bot is ready!');
    bot.user.setActivity('Puyo Puyo\u2122Tetris\u00AE 2',{type: 'PLAYING'});
	
	// Uncomment to set status to "idle"
	/*bot.user.setPresence({
		status: 'idle'
	});*/
});

// Reconnecting
bot.on("reconnecting", () => {
	console.log("Reconnecting!");
	});
	
// Resume
bot.on("resume", () => {
	console.log("Connection restored!");
	bot.user.setActivity('Puyo Puyo\u2122Tetris\u00AE 2',{type: 'PLAYING'});
	});
	
//bot.on('debug', console.log);
bot.on('message', message => {
	bot.user.setActivity('Puyo Puyo\u2122Tetris\u00AE 2',{type: 'PLAYING'});
    // Prefix is 'o!'
    if (message.content.substring(0, 2) == 'o!') {
        var args = message.content.substring(2).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);

		// Commands
        switch(cmd) {
			
			// o!help
			case 'help':
				message.channel.send("Commands:\n\n**General**\n``o!help``: Display this message\n``o!pi``: Make O speak\n\n**Voice**\n``o!voice``: Make O speak for real\n``o!altvoice``: Make O speak in his alternate voice\n``o!jvoice``: Play one of O's Japanese voice lines\n``o!jaltvoice``: Play one of O's alternate Japanese voice lines\n``o!listen``: O-Bot will record your voice and send it back to you! (These recordings are NOT stored locally.)\n``o!dc``: Make O-Bot leave the voice channel\n\n**Other**\n``o!tetrio-rooms``: Show all open rooms in TETR.IO\n``o!twitch``: Get link for O-Bot creator's Twitch channel\n``o!donate``: Feed O-Bot");
				break;
			
			// o!pi
			case 'pi':
				message.channel.send('Pipi? Pipi-pipipipipi!');
				break;
				
			// o!voice
			case 'voice':
				play(message, "o_sound/000000" + randomHex() + ".wav");
				break;
				
			// o!altvoice
			case 'altvoice':
				play(message, "o_sound/alt/000000" + randomHex() + ".wav");
				break;
				
			// o!jvoice
			case 'jvoice':
				play(message, "o_sound/j/000000" + randomHex() + ".wav");
				break;
				
			// o!jaltvoice
			case 'jaltvoice':
				play(message, "o_sound/j_alt/000000" + randomHex() + ".wav");
				break;

			// o!twitch
			case 'twitch':
				message.channel.send('Pipi!\nhttps://twitch.tv/notengonombreusario');
				break;
			
			// o!donate
			case 'donate':
				message.channel.send('Pipipiii!!\nhttps://streamlabs.com/notengonombreusario');
				break;
				
			// o!dc	
			case 'dc':
				if(!message.member.voice.channel){
					message.channel.send("``o!dc`` can only be run while you are in a voice channel!");
				}
				else{
					message.channel.send("Disconnecting!");
					message.member.voice.channel.leave();
				}
				
				break;
				
			case 'leave':
				if(!message.member.voice.channel){
					message.channel.send("``o!leave`` can only be run while you are in a voice channel!");
				}
				else{
					message.channel.send("Disconnecting!");
					message.member.voice.channel.leave();
				}
				
				break;
			// o!randomhex
			case 'randomhex':
				message.channel.send("Your random hexadecimal number is " + randomHex());
				break;
				
			// o!time
			case 'time':
				message.channel.send("The current time is " + getTime());
				break;
				
			// o!listen
			case 'listen':
				listen(message);
				break;
				
			// o!tetrio-rooms
			case 'tetrio-rooms':
				message.channel.startTyping();
				httpGet(message, "https://tetr.io/api/rooms");
				//message.channel.send("Command temporarily unavailable");
				break;
	
			// Invalid command
			default:
				message.channel.send("Pipi...\nInvalid command! Use ``o!help`` to list available commands!");
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
				message.channel.send("Join a voice channel and try again!");
			}
			
			else if (!VC.permissionsFor(message.client.user).has('CONNECT') || !VC.permissionsFor(message.client.user).has('SPEAK')) {
				message.channel.send('Missing join/speak permissions!');
			 }
		
			else{
				// Here we try to join the voicechat and save our connection into our object.
				var connection = await VC.join();
				//message.channel.send("Playing!");
				console
				const dispatcher = connection.play(sound);
					dispatcher.on("finish", () => {
						//message.channel.send("Disconnecting!");
						dispatcher.destroy();
						//VC.leave();
					})
					.on('error', error => {
						console.error(error);
					});
					
			}
	
	} catch(error){
		console.log(error);
	}
	
}

function randomHex(){
	let hex="";
	let randNum = 0;
	randNum = (Math.floor(Math.random()*Math.floor(41)));
	if(randNum<16){
		hex = "0" + randNum.toString(16);
	}
	else{
		hex = randNum.toString(16);
	}
	
	return hex;
}

function getTime(){
	var date = new Date();
	var hr = date.getHours();
	var AMPM = hr>=12?"PM":"AM";
	hr=((hr+11)%12+1);
	
	var min = date.getMinutes();
	if(min < 10){
		min = "0" + min;
	}
	var sec = date.getSeconds();
	if(sec < 10){
		sec = "0" + sec;
		}
	var time = hr + ":" + min + ":" + sec + " " + AMPM;
	return time;
	}
	
async function listen(message){
	try{
		var date = new Date();
		const VC = message.member.voice.channel;
			if(!message.guild){
				message.channel.send("The bot cannot join private voice chats.");
			}
			
			else if(!VC){
				message.channel.send("Join a voice channel and try again!");
			}
			
			else if (!VC.permissionsFor(message.client.user).has('CONNECT') || !VC.permissionsFor(message.client.user).has('SPEAK')) {
				message.channel.send('Missing join/speak permissions!');
			 }
		
			else{
				
				// Play silence, then start listening
					var connection = await VC.join();
					var user = message.member.user;
					play(message, "ready.wav");
					setTimeout(async () => {
						message.channel.send("Speak now!");
	
						const audio = connection.receiver.createStream(user,{mode: 'pcm'});
						var filename = message.member.user.username + "_" + date.getTime();
						audio.pipe(fs.createWriteStream(filename));
						var cmd = "sox -t raw -r 48000 -e signed -b 16 -c 2 " + filename + " " + filename + ".wav";
						var delcmd = "rm " + filename + ".wav" + " && rm " + filename;
						var wavfile = filename + ".wav";
						
						audio.on('end', async (filename) => {
							message.channel.send("Finished!");
							audio.destroy();
							
							exec(cmd, (error, stdout, stderr) => {
							if(error){
								console.log(error.message);
								return;
								}
							if(stderr){
								console.log(stderr);
								return;
							}
							console.log(stdout);
							});
							
							setTimeout(() =>{
								message.channel.send({
								files: [wavfile]
								});
								},500);
								
							setTimeout(() => {
								exec(delcmd, (error, stdout, stderr) => {
								if(error){
									console.log(error.message);
									return;
									}
								if(stderr){
									console.log(stderr);
									return;
								}
								console.log(stdout);
								})
							},1000);
							})
								
						.on('error', error => {
							console.error(error);
						});
					}, 200);
					
				}
			}
			
		catch(error){
		console.log(error);
	}
			
		
	
}

function printRooms(message, jsonInput){
	var additionalText = "";
	var roomList = "";
	var roomState = "";
	roomStats = JSON.parse(jsonInput);
	message.channel.send("Room list:");
	for(i in roomStats.rooms){
		additionalText = "";
		if(roomStats.rooms[i].meta.userlimit>0){
			additionalText = "/" + roomStats.rooms[i].meta.userlimit;
		}
		if(roomStats.rooms[i].playercount > roomStats.rooms[i].playingplayers){
			additionalText = additionalText + " " + "+" + (roomStats.rooms[i].playercount - roomStats.rooms[i].playingplayers);
		}
		roomList = roomList + "\n" + roomStats.rooms[i].meta.name + " -- " + roomStats.rooms[i].playingplayers + additionalText + "\n" + roomStats.rooms[i].state + "\nhttps://tetr.io/#" + roomStats.rooms[i].id + "\n\n";
	}
	message.channel.send(roomList);
	message.channel.stopTyping();

//console.log(jsonInput);
//console.log(roomStats.rooms);

}

function httpGet(message, URL)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", URL,  true);
	xmlHttp.setRequestHeader("Authorization", "Bearer " + auth.tetrio_token);
	xmlHttp.onload = function(e){
		if(xmlHttp.readyState === 4){
			if(xmlHttp.status === 200){
				printRooms(message, xmlHttp.responseText);
			} else{
				console.error(xmlHttp.statusText);
				message.channel.stopTyping();
			}
		}
	};
	xmlHttp.onerror = function (e){
		console.error(xmlHttp.statusText);
		message.channel.stopTyping();
	};
    xmlHttp.send( null );
    
}	

bot.login(auth.token);
