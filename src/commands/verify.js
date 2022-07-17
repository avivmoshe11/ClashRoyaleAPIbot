const { Profile } = require("../models/profiles");
const fetch = require("../functions/fetch");
const grantRole = require("../functions/grantRole");

module.exports = {
  name: "verify",
  run: async (client, msg, args) => {
    const userId = msg.author.id;
    const profileFromDb = await Profile.findOne({ discordId: userId });
    if (!profileFromDb) return msg.channel.send("There is no player profile saved under that user");
    if (profileFromDb.verified) return msg.channel.send("User already verified");

    if (!profileFromDb.verifyQuest) {
      const generateQuest = `verify${Math.floor(Math.random() * 100)}`;
      await Profile.findOneAndUpdate(
        {
          discordId: userId,
        },
        {
          verifyQuest: generateQuest,
        }
      );
      return msg.channel.send(
        `<@${userId}> in order to verify, please open a new clan named: ${generateQuest} and re-run the command in 1-2 minutes`
      );
    } else {
      const data = await fetch.run("players", [profileFromDb.playerTag.replace("#", "%23")]);
      if (!data.response.role || !data.response.clan)
        return msg.channel.send(
          `<@${userId}> in order to verify, please open a new clan named: ${profileFromDb.verifyQuest} and re-run the command in 1-2 minutes`
        );
      if (data.response.role == "leader" && data.response.clan.name == profileFromDb.verifyQuest) {
        await Profile.findOneAndUpdate(
          {
            discordId: userId,
          },
          {
            verified: true,
          }
        );
        await grantRole.run(msg, userId);
        return msg.channel.send("Verified!");
      }
    }
  },
};
