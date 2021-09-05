const { MessageEmbed } = require("discord.js");
const conf = require('../ayarlar.js');
const { Register } = require('../helpers/functions.js');

exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(conf.roller.registerStaff) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(conf.emoji.no);

    let uye = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

    let embed = new MessageEmbed().setTimestamp().setColor('RANDOM')
    if (!uye) return message.channel.send(embed.setDescription(`${message.author}, Bir Kullanıcı Etiketlemelisin.`)).sil(5);

    if (uye.id === client.user.id) return message.react(conf.emoji.no);
    if (uye.id === message.author.id) return message.react(conf.emoji.no);

    await Register.kayıtsız(uye).catch((err) => console.log(err));

    message.channel.send(embed.setDescription(`${uye} Adlı Kullanıcı ${message.author} Tarafından Başarıyla Kayıtsıza Atıldı.`)).sil(5);
}
exports.config = {
    aliases: ['unreg','unregistered'],
    name:'kayıtsız'
}