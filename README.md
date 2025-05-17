[![Node.js CI](https://github.com/gizmo4487/O-Bot/actions/workflows/node.js.yml/badge.svg)](https://github.com/gizmo4487/O-Bot/actions/workflows/node.js.yml)
# O-Bot
A Discord bot themed around O, a character in SEGA's Puyo Puyo Tetris

**Adapted from the tutorial at https://www.digitaltrends.com/gaming/how-to-make-a-discord-bot/**

## Dependencies and setup
* Run ``npm install`` in the bot folder to install dependencies.
* Create a ``.env`` file in the root directory and populate ``TOKEN`` with your Discord bot token.
* To run: ``node --env-file=.env o-bot.js``

You may notice that slash commands are missing after you first invite the bot. You can fix this by following [this guide](https://discordjs.guide/creating-your-bot/command-deployment.html). 

## A word about audio files
O's voice lines are **not** included in this repository. They can be found in your (hopefully legal) copy of Puyo Puyo Tetris. By default, O-Bot looks for audio files numbered in hexadecimal from "00000000.wav" to "00000028.wav" in each voice folder. These folders should be "[O-Bot]/o_sound", "[O-Bot]/o_sound/alt", "[O-Bot]/o_sound/jp", and "[O-Bot]/o_sound/jp_alt".

## Commands
### General
* ``/help``: Display help message
* ``/pi``: Make O speak

### Voice
* ``/voice [type]``: O-Bot will join a voice channel and play one of O's voice lines. ``type`` can be ``Normal``, ``Alt``, ``JP``, or ``JP Alt``. The default is ``Normal``.
* ``/radio``: Stream audio from an internet radio station located at https://radio.gizmo4487.dev

*More commands to follow*

## Invitation Link
To add O-Bot to your server, [click here](https://discord.com/oauth2/authorize?client_id=688221134751399992)

## More Information
Be sure O-Bot has permission to speak in voice channels.


*O-Bot created by gizmo4487*
