const { MessageEmbed, MessageFlags } = require('discord.js');
const config = require('../ayarlar.js');
const { JsonDatabase } = require('wio.db');
const sicil = new JsonDatabase({ databasePath:'./databases/Sicil.json' });
const puanlar = new JsonDatabase({ databasePath: './databases/Points.json'});

exports.run = async(client, message, args) => {

if(!message.member.roles.cache.has(config.roller.muteStaff) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(config.emoji.no);

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.react(config.emoji.no);

member.voice.setMute(false);
message.channel.send(
    new MessageEmbed()
    .setColor(config.embed.color)
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
    .setDescription(`${member} üyesinin ses odalarındaki cezası <@${message.author.id}> tarafından kaldırıldı.`)
    );
puanlar.add(`yetkilipuan.${message.author.id}`, config.puan.vmutePoint);
sicil.push(`sicil.${member.id}`, { Type: "VUNMUTE", Staff: message.author.id, Date: Date.now(), Reason: " " })

};

exports.config = {
    name:'vunmute',
    description:'[@Orchi/OrchiID]',
    aliases:["v-unmute","voice-unmute","voiceunmute"],
};