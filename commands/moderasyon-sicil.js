const { MessageEmbed } = require('discord.js');
const { JsonDatabase } = require('wio.db');
const config = require('../ayarlar.js');
const sicil = new JsonDatabase({ databasePath: './databases/Sicil.json'});
const puanlar = new JsonDatabase({ databasePath: './databases/Points.json' });

exports.run = async(client, message, args) => {

if(!message.member.roles.cache.has(config.roller.jailStaff) && !message.member.roles.cache.has(config.roller.muteStaff) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(config.emoji.no);

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.react(config.emoji.no);

if(member) { 
    let data = sicil.fetch(`sicil.${member.id}`);
    if(!data) return message.react(config.emoji.no);
    let sicilgüvenliği;
     if(data.length > 2) sicilgüvenliği = `(\`${global.emojiler.tik} Çok Güvenli!\`)`
     if(data.length > 5) sicilgüvenliği = `(\`${global.emojiler.tik} Güvenli!\`)`
     if(data.length > 7) sicilgüvenliği = `(\`${global.emojiler.yukleniyor} Şüpheli!\`)`
     if(data.length > 10) sicilgüvenliği = `(\`${global.emojiler.carpi} Aşırı Şüpheli!\`)`;
    let x = data.map((value, index) => `\`${index+1}.\` **[${value.Type || "Belirtilmemiş"}]** <@${value.Staff || "Belirtilmemiş"}> \`${new Date(value.Date).toTurkishFormatDate() || "Belirtilmemiş"}\` **${value.Reason || "Belirtilmemiş"}**`)
    message.channel.send(new MessageEmbed()
    .setColor(config.embed.color)
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic:true }))
    .setDescription(`${member} kullanıcısının ceza bilgileri; ${sicilgüvenliği}
    ─────────────────────────
    ${x.join("\n") || "*Kullanıcı daha önceden cezalandırılmamış..*"}`))
}
};

exports.config = {
  name:'sicil',
  description:'[@Orchi/OrchiID]',
  aliases:["cezageçmişi","cezalar","penals"]
};