const fetch = require("../functions/fetch");
const { Profile } = require("../models/profiles");
module.exports = {
  name: "save",
  description: "Saves a tag to your discord account",
  group: "all",
  aliases: [],
  run: async (client, msg, args) => {
    const userId = msg.author.id;
    if (!args[0]) return msg.channel.send("invalid tag format (must be #Tag)");
    const tag = args[0];
    const data = await fetch.run("players", tag.replace("#", "%23"));
    if (data.err || data.response.reason == "notFound") return msg.channel.send("invalid tag");

    const profileFromDbByTag = await Profile.findOne({ playerTag: tag });
    if (profileFromDbByTag) return msg.channel.send(`tag is already taken by <@${profileFromDbByTag.discordId}>`);
    const profileFromDbByDiscordId = await Profile.findOne({ discordId: userId });
    if (profileFromDbByDiscordId)
      return msg.channel.send(`your tag is already saved as ${profileFromDbByDiscordId.playerTag} contact an admin to change.`);
    await new Profile({
      discordId: userId,
      playerTag: tag,
    }).save();
    msg.channel.send(`The player **${data.response.name}** has been added to your profile successfully`);
  },
};
