const Discord = require('discord.js');
const ayarlar = require('../ayarlar.js');

exports.run = async(client, message, args) => {
 
  if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.react(ayarlar.emoji.no)
  
      if (!args[0]) return message.react(ayarlar.emoji.no);

  if (args[0] > 1000) return message.react(ayarlar.emoji.no)
    if (isNaN(args[0])) return message.react(ayarlar.emoji.no)
    message.channel.setRateLimitPerUser(args[0]);
    message.react(ayarlar.emoji.yes)
 
};
  exports.config = {
  name:'yavaşmod',
  aliases: ["slow-mode", "yavas-mod", 'yavasmod', 'yavaşmod','ym','slowmode'],
  description:'[args]'
};