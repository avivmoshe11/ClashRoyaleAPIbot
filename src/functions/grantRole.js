const fetch = require("./fetch");
const { Profile } = require("../models/profiles");

module.exports = {
  name: "grantRole",
  run: async (msg, userId) => {
    const member = await msg.guild.members.cache.filter((m) => m.id == userId);
    if (!member) return msg.channel.send("User is not a member in this server.");
    const userFromDb = await Profile.findOne({ discordId: userId });
    if (!userFromDb) return msg.channel.send("error");
    const tag = userFromDb.playerTag;
    const data = await fetch.run("players", tag.replace("#", "%23"));
    if (data.err || data.response.reason == "notFound") return msg.channel.send("invalid tag");
    const highScore = data.response.bestTrophies;
    const arenaRoleName = arenaRole(highScore);

    if (arenaRoleName == "") return;
    const Role = await msg.guild.roles.cache.find((role) => role.name.toLowerCase() == arenaRoleName.toLowerCase());

    await member.first().roles.add(Role);
  },
};

function arenaRole(highScore) {
  if (typeof highScore != "number") highScore = parseInt(highScore.replace(",", ""));
  if (!highScore || highScore < 5000) return "";
  if (highScore >= 5000 && highScore < 5300) return "Challenger I";
  if (highScore >= 5300 && highScore < 5600) return "Challenger II";
  if (highScore >= 5600 && highScore < 6000) return "Challenger III";
  if (highScore >= 6000 && highScore < 6300) return "Master I";
  if (highScore >= 6300 && highScore < 6600) return "Master II";
  if (highScore >= 6600 && highScore < 7000) return "Master III";
  if (highScore >= 7000 && highScore < 7300) return "Champion";
  if (highScore >= 7300 && highScore < 7600) return "Grand Champion";
  if (highScore >= 7600 && highScore < 8000) return "Royal Champion";
  return "Ultimate Champion";
}
