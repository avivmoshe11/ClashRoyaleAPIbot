const grantRole = require("../functions/grantRole");
const { Profile } = require("../models/profiles");
const getplayer = require("./getplayer");

module.exports = {
  name: "profile",
  description: "Shows player card for saved profile on your account",
  group: "all",
  aliases: [],
  run: async (client, msg, args) => {
    let userId;
    if (msg.mentions.users.first()) {
      userId = msg.mentions.users.first().id;
    } else {
      userId = msg.author.id;
    }
    const profileFromDb = await Profile.findOne({ discordId: userId });
    if (!profileFromDb) return msg.channel.send("There is no player profile saved under that user");
    await getplayer.run(client, msg, [profileFromDb.playerTag]);
    if (profileFromDb.verified) await grantRole.run(msg, userId);
  },
};
