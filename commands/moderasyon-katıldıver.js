const Discord = require('discord.js');
const ayarlar = require('../ayarlar.js');
exports.run = async (client, message, args) => { 

if (!message.member.hasPermission('ADMINISTRATOR')) return message.react(ayarlar.emoji.no)

if(!message.member.voice || message.member.voice.channelID != ayarlar.kanallar.meetingRoom) return; 
let üyeler = message.guild.members.cache.filter(member => member.roles.cache.has(ayarlar.roller.katıldıRole) && member.voice.channelID != ayarlar.kanallar.meetingRoom);
üyeler.array().forEach((member, index) => {
  setTimeout(() => {
    member.roles.remove(ayarlar.roller.katıldıRole).catch();
  }, index * 1250)
});

let katıldıverildi = message.member.voice.channel.members.filter(member => !member.roles.cache.has(ayarlar.roller.katıldıRole) && !member.user.bot)
katıldıverildi.array().forEach((member, index) => {
  setTimeout(() => {
    member.roles.add(ayarlar.roller.katıldıRole).catch((err) => console.log(err));
  }, index * 1250)
});
message.channel.send(new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`**${katıldıverildi.size}** kadar kullanıcıya katıldı verdim, **${üyeler.size}** kadar kullanıcıdan ise aldım.`)).catch();
  
};

exports.config = {
  name:'katıldı',
  aliases: ["katıldıver"]
};