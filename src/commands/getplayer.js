const fetch = require("../functions/fetch");
const { MessageEmbed } = require("discord.js");
const { type } = require("os");
const { numberEqual } = require("@sapphire/shapeshift");

module.exports = {
  name: "getplayer",
  run: async (client, msg, args) => {
    if (!args[0].startsWith("#")) return msg.channel.send("must include a valid tag: #tag");
    const playerTag = args[0];
    const data = await fetch.run("players", playerTag.replace("#", "%23"));
    if (data.err || data.response.reason == "notFound") return msg.channel.send("invalid tag");
    try {
      const embeddedMessage = new MessageEmbed()
        .setColor("#04a2d5")
        .setTitle(`**${data.response.name}  |  ${data.response.tag}**`)
        .setURL(`https://royaleapi.com/player/${data.response.tag.slice(1)}`)
        //.setDescription - from mongodb state verification
        .setFields([
          { name: `Season Highestㅤㅤㅤ`, value: `${arenaEmoji(seasonHighest(data))} ${seasonHighest(data)}`, inline: true },
          { name: `Best Seasonㅤㅤㅤㅤ`, value: `${arenaEmoji(bestSeason(data))} ${bestSeason(data)}`, inline: true },
          { name: `Previous Seasonㅤ`, value: `${arenaEmoji(previousSeason(data))} ${previousSeason(data)}`, inline: true },
          { name: `Trophies`, value: `${arenaEmoji(data.response.trophies)} ${data.response.trophies}`, inline: true },
          { name: `Best Trophies`, value: `<:trophies:997463413393469521> ${data.response.bestTrophies}`, inline: true },
          { name: `King Level`, value: `${data.response.expLevel}`, inline: true },
          { name: clanRole(data) + "", value: clan(data), inline: true },
          { name: `Star Points`, value: `<:startpoints:997480900449284146> ${starPoints(data)}`, inline: true },
          { name: `Favorite Card`, value: `${favoriteCard(data)}`, inline: true },
          {
            name: `Wins`,
            value: `<:wins:997483786285617234> ${data.response.wins} **(${parseFloat(
              (data.response.wins / (data.response.losses + data.response.wins)) * 100
            ).toFixed(2)}%)**`,
            inline: true,
          },
          {
            name: `Losses`,
            value: `<:losses:997483784880521307> ${data.response.losses} **(${parseFloat(
              (data.response.losses / (data.response.losses + data.response.wins)) * 100
            ).toFixed(2)}%)**`,
            inline: true,
          },
          { name: `Battles Played`, value: `<:sword:997484929506082886> ${data.response.battleCount}`, inline: true },
          { name: `Three Crown Wins`, value: `<:3c:997490630987108404> ${data.response.threeCrownWins}`, inline: true },
          { name: `Friendly Battle Wins`, value: `<:fb:997490629175169115> ${findFriendlyBattles(data)}`, inline: true },
          { name: `Max Wins`, value: `<:winstar:997490628051091638> ${data.response.challengeMaxWins}`, inline: true },
          { name: `War Day Wins`, value: `<:medal:997489117476696146> ${data.response.warDayWins}`, inline: true },
          { name: `Cards Won`, value: `<:cardscollected:997495145207447562> ${data.response.challengeCardsWon}`, inline: true },
          { name: `Total Donations`, value: `<:cardstack:997495143835906088> ${data.response.totalDonations}`, inline: true },
        ]);
      msg.channel.send({ embeds: [embeddedMessage] });
    } catch {
      msg.channel.send("something went wrong. call an admin");
    }
  },
};

function seasonHighest(data) {
  return data.response.leagueStatistics.currentSeason.bestTrophies ? data.response.leagueStatistics.currentSeason.bestTrophies : "Not Yet";
}

function bestSeason(data) {
  return data.response.leagueStatistics.bestSeason.rank
    ? data.response.leagueStatistics.bestSeason.trophies + " #_" + data.response.leagueStatistics.bestSeason.rank + "_"
    : data.response.leagueStatistics.bestSeason.trophies;
}

function previousSeason(data) {
  return data.response.leagueStatistics.previousSeason.rank
    ? data.response.leagueStatistics.previousSeason.trophies + " #_" + data.response.leagueStatistics.previousSeason.rank + "_"
    : data.response.leagueStatistics.previousSeason.trophies;
}

function clanRole(data) {
  if (!data.response.role) return "No Clan";
  if (data.response.role == "member") return "Member in";
  if (data.response.role == "elder") return "Elder in";
  if (data.response.role == "coLeader") return "Co-Leader in";
  if (data.response.role == "leader") return "Leader in";
}

function clan(data) {
  return data.response.clan ? `[**${data.response.clan.name}**](https://royaleapi.com/clan/${data.response.clan.tag.slice(1)})` : "--";
}

function starPoints(data) {
  return data.response.starPoints ? data.response.starPoints : "0";
}

function favoriteCard(data) {
  return data.response.currentFavouriteCard ? data.response.currentFavouriteCard.name : "No Fav Card :(";
}

function arenaEmoji(number) {
  if (typeof number != "number") number = parseInt(number.replace(",", ""));
  if (!number || number < 5000) return "";
  if (number >= 5000 && number < 5300) return "<:j_:997441340625387530>";
  if (number >= 5300 && number < 5600) return "<:i_:997441342118576178>";
  if (number >= 5600 && number < 6000) return "<:h_:997441343565598760>";
  if (number >= 6000 && number < 6300) return "<:g_:997441344710647869>";
  if (number >= 6300 && number < 6600) return "<:f_:997441346325467188>";
  if (number >= 6600 && number < 7000) return "<:e_:997441347554398250>";
  if (number >= 7000 && number < 7300) return "<:c_:997441350641401936>";
  if (number >= 7300 && number < 7600) return "<:d_:997441349353734144>";
  if (number >= 7600 && number < 8000) return "<:b_:997441351929045034>";
  return "<:a_:997441353443188807>";
}

function findFriendlyBattles(data) {
  const achievements = data.response.achievements;
  for (let achievement of achievements) {
    if (achievement.name == "Practice with Friends") {
      return achievement.value;
    }
  }
  return 0;
}
