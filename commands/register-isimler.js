const { MessageEmbed } = require("discord.js");
const { JsonDatabase } = require('wio.db');
const register = new JsonDatabase({ databasePath:'./databases/Register.json'});
const conf = require('../ayarlar.js');

exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(conf.roller.registerStaff) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(conf.emoji.no);

    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp();
    let uye = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!uye) return message.channel.send(embed.setDescription(`Bir Kullanıcı Belirtmelisin`)).sil(5)
    let data = await register.fetch(`isimler.${uye.id}`)
    
    if (!data || !register.fetch(`isimler.${uye.id}`)) return message.channel.send(embed.setDescription(`Bu Kullanıcının geçmiş isimleri bulunamadı.`)).sil(5)
    let isimler = data.map((value, index) => `\`${index +1}.\` \`${value.isim}\` \`|\` Yetkili: **(**<@${value.yetkili}>**)** \`|\` Tarih: \`${new Date(value.zaman).toTurkishFormatDate()}\``).splice(0, 15)
   message.delete();
    message.channel.send(embed.setDescription(`
    ${uye}, Kullanıcısının toplam **${isimler.length}** kayıtı bulundu. 

    ${isimler.join("\n")}
    `)).catch(err => console.log(err)).sil(15);

}
exports.config = {
    aliases:["i"],
    name:'isimler'
}