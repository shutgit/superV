const { MessageEmbed } = require("discord.js");
const { JsonDatabase } = require('wio.db');
const register = new JsonDatabase({ databasePath:'./databases/Register.json'});
const conf = require('../ayarlar.js');

exports.run = async(client, message, args) => {

    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(conf.embed.footer);
if(!message.member.roles.cache.has(conf.roller.registerStaff) && !message.member.hasPermission(8)) return message.react(conf.emoji.no);

    let data = await register.get(`kayıt`) || {};

    let xd = Object.keys(data);
    let topteyit = xd.filter(dat => message.guild.members.cache.has(dat)).sort((a, b) => Number((data[b].e || 0) + (data[b].k || 0)) - Number((data[a].e || 0) + (data[a].k || 0))).map((value, index) => `\`${index + 1}.\` ${message.guild.members.cache.get(value)} Toplam **${((data[value].e || 0) + (data[value].k || 0))}** (**${((data[value].e || 0))}** Erkek **${((data[value].k || 0))}** Kadın)`).splice(0, 15);

    message.lineReply(embed.setDescription(`
    Sunucumuzda en çok kayıt yapanların listesi; (\`${topteyit.length} Yetkili\`)
    ─────────────────────────
    ${topteyit.join("\n") || "Teyit veritabanı bulunamadı!"}`)).sil(15);

};

exports.config = {
    aliases: ['top-teyit'],
    name:'topteyit'
};