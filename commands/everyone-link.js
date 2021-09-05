const { MessageEmbed } = require('discord.js');
const ayarlar = require('../ayarlar.js');

exports.run = async(client, message, args) => { 
    
    message.delete()
    message.channel.send(ayarlar.bot.guildVanityURL);

};

exports.config = { 
    name:'link',
    aliases:['sunucudaveti','sunucu-daveti','sunuculink','sunucu-link']
};