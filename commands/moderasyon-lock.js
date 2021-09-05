const Discord = require('discord.js');
const ayarlar = require('../ayarlar.js');

exports.run = (client, message, args) => {
if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.react(ayarlar.emoji.no)

let channel = message.channel;

let everyone = message.guild.roles.cache.find(a => a.name === '@everyone');
channel.updateOverwrite(everyone, { 'SEND_MESSAGES': false }, 'Kilitleyen '+message.author.tag);
message.react(ayarlar.emoji.yes)
};
exports.config = {
  name:'kilitle',
  aliases: ["kanalkilit","lock"]
};
