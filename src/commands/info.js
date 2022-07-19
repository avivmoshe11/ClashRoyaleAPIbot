const { MessageEmbed } = require("discord.js");
const main = require("../bot");
module.exports = {
  name: "info",
  description: "This method returns the bot's full command list that's available for members",
  group: "none",
  aliases: ["cmds", "cmd"],
  run: async (client, msg, args) => {
    const spaces = "ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ";
    let name = await botname(client, msg);
    name = name ? name : client.user.username;
    const exampleEmbed = new MessageEmbed()
      .setColor("#04a2d5")
      .setThumbnail("https://yt3.ggpht.com/ytc/AKedOLSCwTWVJEsVlAvynsu6RQk8iW-LyDt2x9bssakV3Q=s900-c-k-c0x00ffffff-no-rj")
      .setTitle(`${name}'s Commands `)
      .setDescription(`**Basic command list:** ${spaces}  `)
      .addFields(commandlist(client, main.module.prefix, "all"))
      .addField("\u200B", " \u200B")
      .addField(`Moderator command list:`, `${spaces}`)
      .addFields(commandlist(client, main.module.prefix, "mod"))
      .setImage("https://clashroyale.com/uploaded-images/2ndanniversary_hero.jpg?mtime=20180301060016")
      .setTimestamp()
      .setFooter({
        text: "made by Aviv#1234",
        iconURL: "https://static.euronews.com/articles/stories/05/79/99/44/2000x1333_cmsv2_292bef7f-8fab-5f0d-bed5-63856832498b-5799944.jpg",
      });
    msg.channel.send({ embeds: [exampleEmbed] });
  },
};

function commandlist(client, prefix, group) {
  let messageback = [];
  const commands = client.commands;
  for (let value of commands.values()) {
    if (value.group == group) messageback.push({ name: `${prefix}${value.name}`, value: value.description });
  }
  return messageback;
}

async function botname(client, msg) {
  let guilds = client.guilds.cache;
  let currentguild = msg.guildId;
  let name;
  for (let [key, value] of guilds) {
    if (key == currentguild) {
      name = await value.members.cache.get("997350204850307192").nickname;
    }
  }
  return name;
}
