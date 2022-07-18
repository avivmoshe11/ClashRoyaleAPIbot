require("dotenv").config();
const { resolveSoa } = require("dns");
const { Client, Intents, Collection, Guild, GuildChannel, GuildMember, TextChannel, Message, Channel } = require("discord.js");
const mongoose = require("mongoose");
const { Profile } = require("./models/profiles");
const client = new Client({ intents: new Intents(32767) });
const fs = require("fs");

mongoose
  .connect(process.env.LOGIN)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(`could not connect to mongo db ${err}`);
  });

client.commands = new Collection();
client.aliases = new Collection();

const commands = fs.readdirSync("./src/commands").filter((file) => file.endsWith(".js"));
console.log("loading...");

for (file of commands) {
  const commandName = file.split(".")[0];
  const command = require(`./commands/${commandName}`);
  client.commands.set(command.name, command);
  command.aliases.forEach((alias) => {
    client.aliases.set(alias, command.name);
  });
  console.log(`${file} has been loaded`);
}

const prefix = "!";

client.on("ready", async () => {
  console.log("ready!");
});

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  if (msg.content.startsWith(prefix)) {
    console.log(msg.author.tag + ": " + msg.content);
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    let command;
    if (client.commands.has(commandName)) {
      command = client.commands.get(commandName);
    } else if (client.aliases.has(commandName)) {
      command = client.commands.get(client.aliases.get(commandName));
    } else {
      return msg.channel.send({ content: "That Command doesn't exist" });
    }
    command.run(client, msg, args);
  }
});

client.login(process.env.DISCORD_TOKEN);

exports.module = {
  prefix: prefix,
};
