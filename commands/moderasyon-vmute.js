const { MessageEmbed } = require('discord.js');
const config = require('../ayarlar.js');
const { JsonDatabase } = require('wio.db');
const sicil = new JsonDatabase({ databasePath: './databases/Sicil.json' });
const puanlar = new JsonDatabase({ databasePath: './databases/Points.json' });
const ms = require('ms');

exports.run = async(client, message, args) => { 

if(!message.member.roles.cache.has(config.roller.muteStaff) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(config.emoji.no);

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member)  return message.lineReply(`üye etiketle gir.`).sil(3);

if(!member.voice.channel)  return message.lineReply(`Üye seste değil.`).sil(3);

let süre = args[1];
if(!süre) return message.lineReply(`süre gir.`).sil(3);

let sebep = args.slice(2).join(' ');
if(!sebep) return message.lineReply(`sebep gir.`).sil(3);

member.voice.setMute(true);
message.react(config.emoji.yes);
message.channel.send(
    new MessageEmbed().setAuthor(message.author.tag, member.displayAvatarURL({ dynamic:true })).setFooter(global.config.embed.footer)
    .setDescription(`
    • Ceza ID: \`#${puanlar.get(`cezaid`) || 0}\`
    • Ceza Türü: \`VOICE-MUTE\`
    • Cezalandırılan Üye: **${member}** (\`${member.user.tag}\` - \`${member.id}\`)
    • Cezalandıran Yetkili: **${mesage.author}** (\`${message.author.tag}\` - \`${message.author.id}\`)
    • Cezalandırma Tarihi: \`${new Date(Date.now().toTurkishFormatDate())}\`
    • Ceza sebebi: \`${sebep}\`
    `))
client.channels.cache.get(config.kanallar.penalLog).send(`${member} ${message.author} tarafından aldığı ceza yüzünden **${config.puan.vmutePoint}** ceza puanı aldı.`)
puanlar.add(`cezapuan.${member.id}`, config.puan.vmutePoint);
puanlar.add(`yetkilipuan.${message.author.id}`, config.puan.vmutePoint);
sicil.push(`sicil.${member.id}`, { Type: "VMUTE", Staff: message.author.id, Date: Date.now(), Reason: sebep })

setTimeout(async() => { 

member.voice.setMute(false);

}, ms(süre))

};

exports.config = {
    name:'vmute',
    description:'[@Orchi/OrchiID] [reason]',
    aliases:["voicemute","v-mute","voice-mute"]
};