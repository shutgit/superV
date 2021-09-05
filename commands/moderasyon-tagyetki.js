const Discord = require('discord.js');
const ayarlar = require('../ayarlar.js');
 
exports.run = async(client, message, args) => {

  if (!message.member.hasPermission("ADMINISTRATOR")) return message.react(ayarlar.emoji.no)

  try {

    message.guild.members.cache.filter(members => members.user.username.includes(ayarlar.other.tag) && members.user.username.includes(ayarlar.other.etikettag)).roles.add(ayarlar.roller.tagRole)
    message.react(ayarlar.emoji.yes)

  } catch(err) { console.log(err) }

};
 
exports.config = {
  name:'tagyetki',
  aliases: ["tag-yetki"]
};