const { MessageEmbed } = require('discord.js');

exports.run = async(client, message, args) => { 

    let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if(!rol) return message.reply(`rol gir.`).sil(3);

    if(rol) {
        message.guild.members.cache.forEach((üyeler) => üyeler.roles.remove(rol.id))
    }
};

exports.config = {
    name:'herkesten-rol-al',
    aliases:['herkestenrolal'],
    description:"[@Role/RoleID]"
};