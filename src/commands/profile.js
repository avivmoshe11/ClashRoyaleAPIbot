const { Profile } = require("../models/profiles");
const getplayer = require("./getplayer");

module.exports = {
  name: "profile",
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
  },
};
