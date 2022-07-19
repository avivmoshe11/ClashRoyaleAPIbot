# ClashRoyaleAPIbot


**ClashRoyaleAPIbot** is a custom bot for discord, created to serve the ClashRoyaleIL discord community - replacing the wellknown "deckshop bot" due to malfunctions in deckshop, using the *discord.js* v13 module.



# Discord.js

![discord.js logo](https://camo.githubusercontent.com/d55d8a7f07a103454ebb77b653d9600ce27e011f78395d9713b432c8c011c76a/68747470733a2f2f646973636f72642e6a732e6f72672f7374617469632f6c6f676f2e737667)
**discord.js** is a powerful Node.js module that allows you to interact with the Discord API.
* Object-oriented
* Predictable abstractions
* Performant
* 100% coverage of the *Discord API*

For further information about **discord.js** module [discord.js website](https://discord.js.org/#/)

## What is a discord bot

A **bot** is an automated Discord account. It utilises the [Discord API](https://discord.com/developers/docs/intro). They have a "BOT" tag next to their username. They can be added through the API. Bots typically follow a command structure, where a user sends a prefixed message and the bot reponds, though bots can work in many different ways.

## Requirements


* Discord bot Token [Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
* Node.js v16.16 or above

## Features & Commands


* default **Prefix** is `!!`

* **getplayer** - Returns a player card from the official Clash Royale API and designed to feature the information nicely. 
  `!!getplayer #playertag`
  
* **save** - Saves a valid tag to the user's discord user.
  `!!save #playertag`
  
  ![help command with attributes](https://github.com/avivmoshe11/FullStackIL-Bot/blob/master/src/images/help.png?raw=true)

* **verify** - Addes a quest to your account to open a clan with the given name. Re-run the command once you finished. Once you're verified you will get a rank role based on your account's highest trophies.
  `!!verify`

* **verifyuser** - Moderator restricted function, verifies a user (target user if tagged else the command sender) without need of quest. Once the user is verified he will recieve a rank role based on the account's highest trohpies.
  `!!verifyuser @user`
  
  ![adminpanel command](https://github.com/avivmoshe11/FullStackIL-Bot/blob/master/src/images/adminpanel.png?raw=true)

* **profile** - Return a player card (same as in getplayer) from the user linked to the discord account. (tag already saved). (can ask for user's profile or command sender profile if no one is tagged).
  `!!profile @user`
  
* **chests** - Returns the future chests the user is about to recieve and the special chests + their location in queue. (can ask for user's chests or command sender chests if no one is tagged).
  `!!chests @user`
  
* **info** - A dynamic-designed command featuring all of the commands available by the bot with a description,devided to basic command and mod commands.
  ![info command](https://github.com/avivmoshe11/FullStackIL-Bot/blob/master/src/images/info.png?raw=true)
  
* **help** - A dynamic-designed command featuring a request for help by user, can add reason and will state voice channel if in one for efficiency bonus.


Additionally, added a full aliases system by the discord users community conventions.
> such as h/helpme for help, cmd/cmds for info and more.
