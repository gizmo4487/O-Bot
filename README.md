# O-Bot
A Discord bot themed around O, a character in SEGA's Puyo Puyo Tetris

**Adapted from the tutorial at https://www.digitaltrends.com/gaming/how-to-make-a-discord-bot/**

## Dependencies and setup
Run ``npm install`` in the bot folder to install dependencies.
In order for ``o!listen`` to work, this bot **must** run on Linux with the "sox" program installed:

``sudo apt install sox``

This is used to convert the raw PCM audio into a WAV file for uploading.

Additionally, a file named "ready.wav" containing 100 ms of silence should be placed in the O-Bot root directory. This is used by ``o!listen`` to get O-Bot out of a perpetual speaking state.

## A word about audio files
O's voice lines are **not** included in this repository. They can be found in your (hopefully legal) copy of Puyo Puyo Tetris. By default, O-Bot looks for audio files numbered in hexadecimal from "00000000.wav" to "00000028.wav" in each voice folder. These folders should be "[O-Bot]/o_sound", "[O-Bot]/o_sound/alt", "[O-Bot]/o_sound/j", and "[O-Bot]/o_sound/j_alt".

## Commands
### General
* ``o!help``: Display help message
* ``o!pi``: Make O speak

### Voice
* ``o!voice``: O-Bot will join a voice channel and play one of O's voice lines, then leave
* ``o!altvoice``: Same as ``o!voice``, but with O's alternate voice
* ``o!jvoice``: Same as ``o!voice``, but with O's default Japanese voice
* ``o!jaltvoice``: Same as ``o!voice``, but with O's alternate Japanese voice
* ``o!listen``: O-Bot will record your voice until you stop speaking, then send a WAV file to the text channel you ran the command in

### Other
* ``o!randomhex``: Generate a random hexadecimal number from 0x00 to 0x28 (used to debug randomHex() for selecting which WAV file to play)
* ``o!time``: Get the current time (including seconds) in a 12-hour format
* ``o!twitch``: Get link to my Twitch channel
* ``o!donate``: Get link to my Streamlabs donation page

*More commands to follow*

## Invitation Link
To add O-Bot to your server, [click here](https://discordapp.com/oauth2/authorize?&client_id=688221134751399992&scope=bot&permissions=68672)

## More Information
The bot's availability will be limited at first since my computer and I share the same sleep schedule. If O-Bot is unavailable, it will appear as "Offline".

**Please note that 'auth.json' is intentionally missing. If you're looking for tokens, go to Chuck E. Cheese!**


*Created by gizmo4487*
