const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "spank",
 aliases: [],
 description: "Spank another user. :smirk:",
 category: "NSWF",
 usage: "spank <user>",
 run: async (client, message, args) => {
  const user = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase());
  if (!user) {
   return message.lineReply({
    embed: {
     color: 16734039,
     description: ":smirk: | You must mention a user to spank",
    },
   });
  }
  if (message.author === user || message.member == user) {
   return await message.lineReply({
    embed: {
     color: 16734039,
     description: ":smirk: | You cant spank yourself ;-; (Try spanking someone else, Maybe you need some help?)",
    },
   });
  }
  (async () => {
   try {
    const response = await fetch("https://nekos.life/api/v2/img/spank");
    const body = await response.json();
    const embed = new Discord.MessageEmbed() // Prettier()
     .setAuthor(
      user.displayName + " got spanked by " + message.author.username,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setDescription("Spank :smirk:")
     .setImage(body.url)
     .setColor("RANDOM")
     .setFooter(
      "Requested by " + `${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setTimestamp()
     .setURL(body.url);
    message.lineReply(embed);
   } catch (err) {
    message.lineReply({
     embed: {
      color: 16734039,
      description: "Sorry something went wrong, Please try again later.",
     },
    });
   }
  })();
 },
};