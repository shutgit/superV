const { MessageEmbed } = require('discord.js');
const config = require('../ayarlar.js');
const { JsonDatabase } = require('wio.db');
const sicil = new JsonDatabase({ databasePath:'./databases/Sicil.json' });
const puanlar = new JsonDatabase({ databasePath: './databases/Points.json'});

exports.run = async(client, message, args) => {

if(!message.member.roles.cache.has(config.roller.muteStaff) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(config.emoji.no);

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.react(config.emoji.no);

member.roles.remove(config.roller.mutedRole);
message.channel.send(
    new MessageEmbed()
    .setColor(config.embed.color)
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
    .setDescription(`${member} üyesinin mesaj odalarındaki cezası <@${message.author.id}> tarafından kaldırıldı.`)
    );
puanlar.add(`yetkilipuan.${message.author.id}`, 5);
sicil.push(`sicil.${member.id}`, { Type: "CUNMUTE", Staff: message.author.id, Date: Date.now(), Reason: " " })

};

exports.config = {
    name:'cunmute',
    description:'[@Orchi/OrchiID]',
    aliases:["c-unmute","chat-unmute","chatunmute"],
};