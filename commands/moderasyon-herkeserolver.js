const { MessageEmbed } = require('discord.js');

exports.run = async(client, message, args) => { 

    let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if(!rol) return message.reply(`rol gir.`).sil(3);

    if(rol) {
        message.guild.members.cache.forEach((üyeler) => üyeler.roles.add(rol.id))
    }
};

exports.config = {
    name:'herkese-rol-ver',
    aliases:['herkeserolver'],
    description:"[@Role/RoleID]"
};