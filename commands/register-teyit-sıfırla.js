const { MessageEmbed } = require("discord.js");
const { JsonDatabase } = require('wio.db');
const register = new JsonDatabase({ databasePath:'./databases/Register.json'});
const conf = require('../ayarlar.js');

exports.run = async(client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.react(conf.emoji.no);

    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(conf.embed.footer);
    let uye = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!uye) return message.channel.send(embed.setDescription(`${message.author}, Bir kullanıcı etiketlemelisin.`)).catch((err) => console.log(err)).sil(5);
    if (uye) {
        register.delete(`kayıt.${uye.id}.t`)
        register.delete(`kayıt.${uye.id}.k`)
        register.delete(`kayıt.${uye.id}.e`)
        message.channel.send(embed.setDescription(`${uye} Üyesinin Kayıt Verileri Sıfırlandı`)).catch((err) => console.log(err)).sil(5);
    }
}
exports.config = {
    aliases: ['teyitsıfırla'],
    name:'teyit-sıfırla'
}