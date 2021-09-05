const { MessageEmbed } = require("discord.js");
const { JsonDatabase } = require('wio.db');
const register = new JsonDatabase({ databasePath:'./databases/Register.json'});
const conf = require('../ayarlar.js');
const { Register } = require('../helpers/functions.js');

exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(conf.roller.registerStaff) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(conf.emoji.no);

    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(conf.embed.footer);

    let kullanıcı = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!kullanıcı) return message.channel.send(embed.setDescription(`${message.author}, Bir Kullanıcı Etiketlemelisin.`)).then(m => m.delete({ timeout: 7000 }))
    
    args = args.filter(a => a !== "" && a !== " ").splice(1)
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase() + arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;
    if (!isim || !yaş) return message.react(conf.emoji.no);
    if(yaş < 13) return message.reply(embed.setDescription(`${message.author}, 13 yaş altı olan üyeleri kayıt etmiyoruz.`)).sil(5);
    
    let name = `${conf.other.unTagged} ${isim} ・ ${yaş}`
    if(kullanıcı.user.username.includes(conf.other.tag)) name = `${conf.other.tag} ${isim} ・ ${yaş}`;

    if(kullanıcı.id === client.user.id) return message.react(conf.emoji.no);
    if(kullanıcı.id === message.author.id) return message.react(conf.emoji.no);
    if(kullanıcı.roles.cache.has(conf.roller.manRoles)) return message.react(conf.emoji.no);
    
    await Register.erkek(kullanıcı, message.member, name).catch(err => console.log(err));
    kullanıcı.setNickname(name).catch(err => console.log(err));
    message.react(conf.emoji.yes).catch(err => console.log(err));

};

exports.config = {
    cooldown:2500,
    aliases: ['e'],
    name:'erkek'
};