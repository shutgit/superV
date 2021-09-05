const { MessageEmbed } = require('discord.js');
const config = require('../ayarlar.js');

exports.run = async(client, message, args) => { 

if(!message.member.hasPermission("BAN_MEMBERS") && !message.member.hasPermission("ADMINISTRATOR")) return message.react(config.emoji.no);

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.react(config.emoji.no);

message.guild.members.unban(member.id);
message.react(config.emoji.yes);
message.channel.send(
new MessageEmbed()
.setColor(config.embed.color)
.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
.setDescription(`${member} üyesinin yasağı ${message.author} tarafından kaldırıldı.`)
);

};

exports.config = {
    name:'unban',
    description:'[@Orchi/OrchiID]',
    aliases:[]
}