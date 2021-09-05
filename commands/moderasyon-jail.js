const { MessageEmbed } = require('discord.js');
const config = require('../ayarlar.js');
const { JsonDatabase } = require('wio.db');
const sicil = new JsonDatabase({ databasePath: './databases/Sicil.json' });
const puanlar = new JsonDatabase({ databasePath: './databases/Points.json' });
const jail = new JsonDatabase({ databasePath:'./databases/JailRolesData.json'});
const { Penal } = require('../helpers/functions.js');

exports.run = async(client, message, args) => { 

if(!message.member.roles.cache.has(config.roller.jailStaff) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(config.emoji.no);

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.reply(`üye etiketle.`).sil(3);

let süre = args[1];
if(!süre) return message.reply(`süre gir.`).sil(3);

let sebep = args.slice(2).join(' ');
if(!sebep) return message.reply(`sebep gir.`).sil(3);

message.react(config.emoji.yes)
Penal.jail(member, message.author, sebep, süre)
message.channel.send(
    new MessageEmbed().setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true })).setFooter(global.config.embed.footer)
    .setDescription(`
    • Ceza ID: \`#${puanlar.get(`cezaid`) || 0}\`
    • Ceza Türü: \`JAIL\`
    • Cezalandırılan Üye: **${member}** (\`${member.user.tag}\` - \`${member.id}\`)
    • Cezalandıran Yetkili: **${mesage.author}** (\`${message.author.tag}\` - \`${message.author.id}\`)
    • Cezalandırma Tarihi: \`${new Date(Date.now().toTurkishFormatDate())}\`
    • Ceza sebebi: \`${sebep}\`
    `))
};

exports.config = {
    name:'jail',
    description:'[@Orchi/OrchiID] [reason]',
    aliases:["karantina"]
};