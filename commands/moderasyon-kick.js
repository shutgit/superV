const { MessageEmbed } = require('discord.js');
const config = require('../ayarlar.js');
const { JsonDatabase } = require('wio.db');
const sicil = new JsonDatabase({ databasePath: './databases/Sicil.json' });
const puanlar = new JsonDatabase({ databasePath: './databases/Points.json' });

exports.run = async(client, message, args) => { 

if(!message.member.roles.cache.has(config.roller.mutehammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(config.emoji.no);

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.react(config.emoji.no);

let sebep = args.slice(1).join(' ');
if(!sebep) return message.react(config.emoji.no);

message.guild.members.cache.get(member.id).kick({ reason:sebep });
message.react(config.emoji.yes);
message.channel.send(
new MessageEmbed()
.setColor(config.embed.color)
.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
.setDescription(`
${member} üyesi sunucudan atıldı;
─────────────────────────
\`•\` Yetkili: <@${message.author.id}>
\`•\` Atılma sebebi: \`${sebep}\`
\`•\` Atılma tarihi: \`${new Date().toTurkishFormatDate()}\`
`)
);

};

exports.config = {
    name:'kick',
    description:'[@Orchi/OrchiID] [reason]',
    aliases:[]
}