const  Discord = require("discord.js");
const conf = require('../ayarlar.js');

exports.run = async(client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.react(conf.emoji.no)
        
        let sesteolmayan = message.guild.members.cache.filter(s => s.roles.cache.has(conf.roller.registerStaff)).filter(s => !s.voice.channel).map(s => s).join('\n')
        let sesteolan = message.guild.members.cache.filter(s => s.roles.cache.has(conf.roller.registerStaff)).filter(s => s.voice.channel).map(s => s).join('\n')
        
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor("Sesteki Yetkililer", message.author.avatarURL({ dynamic: true }))
            .setTimestamp()
            .setDescription(`Sestekiler; \n${sesteolan || "Kimse yok"}\n\nSeste olmayanlar;\n${sesteolmayan || "Kimse yok"}`)
            .setColor("RED")).sil(10)
    }

exports.config = {
name:'yetkilises',
aliases:["yses"]
};