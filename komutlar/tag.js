const Discord = require("discord.js");
exports.run = async (bot, message, args) => {
 const istatistikler = new Discord.MessageEmbed()
 message.channel.send(`**<a:tac2:793345110036840510> Sanal Alemin En İyi Tagı <a:tac2:793345110036840510>\n\<a:tanri:793345069100564480> Uzun:Quato \n\<a:tanri:793345069100564480> Emoji:⛧ **`)
 return message.channel.send();
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "tag",
  description: "",
  usage: ""
}