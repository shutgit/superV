const { MessageEmbed } = require("discord.js");
const { JsonDatabase } = require('wio.db');
const register = new JsonDatabase({ databasePath:'./databases/Register.json'});
const conf = require('../ayarlar.js');
const { Register } = require('../helpers/functions.js');

exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(conf.roller.registerStaff) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(conf.emoji.no);

    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(conf.embed.footer);

    let uye = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!uye) return message.channel.send(embed.setDescription(`${message.author}, Bir Kullanıcı Etiketlemelisin.`)).sil(5);
    
    args = args.filter(a => a !== "" && a !== " ").splice(1)
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase() + arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;
    if (!isim || !yaş) return message.channel.send(embed.setDescription(`${message.author}, Bir İsim Belirtmelisin.`)).sil(5);
    if(yaş < 13) return message.reply(embed.setDescription(`${message.author}, 13 yaş altı olan üyeleri kayıt etmiyoruz.`)).sil(5);

    let name = `${conf.other.unTagged} ${isim} ・ ${yaş}`
    if(uye.user.username.includes(conf.other.tag)) name = `${conf.other.tag} ${isim} ・ ${yaş}`;

    if (uye.id === client.user.id) return message.react(conf.emoji.no);
    if (uye.id === message.author.id) return message.react(conf.emoji.no);
    if (uye.roles.cache.has(conf.roller.womanRoles)) return message.react(conf.emoji.no);

    await Register.kız(uye, message.member, name);
    uye.setNickname(name);
    message.react(conf.emoji.yes);

};

exports.config = {
    cooldown:2500,
    aliases: ['k','kadın'],
    name:'kız'
};