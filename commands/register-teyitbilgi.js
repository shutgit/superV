const { MessageEmbed } = require("discord.js");
const { JsonDatabase } = require('wio.db');
const register = new JsonDatabase({ databasePath:'./databases/Register.json'});
const conf = require('../ayarlar.js');

exports.run = async(client, message, args) => {

if(!message.member.roles.cache.has(conf.roller.registerStaff) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(conf.emoji.no);

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
let embed = new MessageEmbed().setTimestamp().setColor("RANDOM").setFooter(conf.embed.footer);

/*                                                                       */

        let erkek = await register.get(`kayıt.${member.id}.e`)
        let toplam = await register.get(`kayıt.${member.id}.t`)
        let kız = await register.get(`kayıt.${member.id}.k`)
        if(toplam === null) toplam = "0"
        if(toplam === undefined) toplam = "0"
        if(erkek === null) erkek = "0"
        if(erkek === undefined) erkek = "0"
        if(kız === null) kız = "0"
        if(kız === undefined) kız = "0"

/*                                                                       */

        message.channel.send(embed.setDescription(`
        ${member}, Kullanıcısının teyit bilgileri;

        \` • \` Toplam kayıtların: \`${toplam}\`
        \` • \` Erkek kayıtların: \`${erkek}\`
        \` • \` Kadın kayıtların: \`${kız}\``)
        .setThumbnail(message.author.displayAvatarURL({ dynamic:true }))
        ).catch((err) => console.log(err)).sil(5);

};

exports.config = {
    aliases: ['teyit-bilgi'],
    name:'teyitbilgi'
};