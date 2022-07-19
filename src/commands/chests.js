const { Profile } = require("../models/profiles");
const fetch = require("../functions/fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "chests",
  description: "Shows future chests",
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
    const playerTag = profileFromDb.playerTag;
    const data = await fetch.run("players", playerTag.replace("#", "%23"));
    const chestData = await fetch.run("players", playerTag.replace("#", "%23"), "upcomingchests");
    if (data.err || data.response.reason == "notFound") return msg.channel.send("invalid tag");

    try {
      const embeddedMessage = new MessageEmbed()
        .setColor("#04a2d5")
        .setTitle(`**${data.response.name}  |  ${data.response.tag}**`)
        .setURL(`https://royaleapi.com/player/${data.response.tag.slice(1)}`)
        .setFields([
          { name: `Upcoming Chests`, value: `${upcomingChests(chestData)}` },
          { name: `Far Juicy Chests`, value: `${farJuicyChests(chestData)}` },
        ])
        .setTimestamp()
        .setFooter({
          text: "made by Aviv#1234",
          iconURL: "https://static.euronews.com/articles/stories/05/79/99/44/2000x1333_cmsv2_292bef7f-8fab-5f0d-bed5-63856832498b-5799944.jpg",
        });
      msg.channel.send({ embeds: [embeddedMessage] });
      farJuicyChests(chestData);
    } catch {
      msg.channel.send("something went wrong. call an admin");
    }
  },
};

function upcomingChests(chestData) {
  const chests = chestData.response.items;
  let chestEmojis = "";
  for (let i = 0; i < 9; i++) {
    chestEmojis += chestToEmoji(chests[i].name);
    if (i == 0) {
      chestEmojis += "=> ";
    }
  }
  return chestEmojis;
}

function farJuicyChests(chestData) {
  const chests = chestData.response.items.filter((index) => index.index > 8);
  let chestEmojis = "";
  for (let chest of chests) {
    chestEmojis += chestToEmoji(chest.name) + chest.index + " ";
  }
  return chestEmojis;
}

function chestToEmoji(chestName) {
  if (chestName.toLowerCase() == "silver chest") return "<:silver:998645022285119608> ";
  if (chestName.toLowerCase() == "golden chest") return "<:golden:998645024285786132> ";
  if (chestName.toLowerCase() == "gold crate") return "<:goldc:998645020485750854> ";
  if (chestName.toLowerCase() == "plentiful gold crate") return "<:pgoldc:998645017264533555> ";
  if (chestName.toLowerCase() == "overflowing gold crate") return "<:ogoldc:998645018623475812> ";
  if (chestName.toLowerCase() == "magical chest") return "<:magical:998645032292716634> ";
  if (chestName.toLowerCase() == "giant chest") return "<:giant:998645030602428436> ";
  if (chestName.toLowerCase() == "mega lightning chest") return "<:MLC:998645029130207272> ";
  if (chestName.toLowerCase() == "epic chest") return "<:epic:998645025627979776> ";
  if (chestName.toLowerCase() == "legendary chest") return "<:legendary:998645027284733993> ";
  return "<:rwc:998645015574225007> ";
}
