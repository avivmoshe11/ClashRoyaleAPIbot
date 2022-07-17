const { Profile } = require("../models/profiles");
const grantRole = require("../functions/grantRole");

module.exports = {
  name: "verifyuser",
  run: async (client, msg, args) => {
    const permitted = await msg.member.roles.cache.get("987702343317458964");
    if (!permitted) return msg.channel.send("You don't have the permissions to use that command");
    try {
      let userId;
      if (msg.mentions.users.first()) {
        userId = msg.mentions.users.first().id;
      } else {
        userId = msg.author.id;
      }
      const profileFromDb = await Profile.findOneAndUpdate(
        {
          discordId: userId,
        },
        {
          verified: true,
        }
      );
      if (!profileFromDb) return msg.channel.send("There is no player profile saved under that user");
      await grantRole.run(msg, userId);
      msg.channel.send("Verified!");
    } catch {
      return msg.channel.send("somthing went wrong");
    }
  },
};
