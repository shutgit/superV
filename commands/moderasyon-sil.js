const { MessageEmbed } = require('discord.js');
const config = require('../ayarlar.js');

exports.run = async(client, message, args) => {

if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.react(config.emoji.no)
if(!args[0] || (args[0] && isNaN(args[0])) || Number(args[0]) < 1 || Number(args[0]) > 100) return message.react(config.emoji.no);
    
message.channel.bulkDelete(Number(args[0])).catch((err) => console.log(err));

};

exports.config = {
    name:'sil',
    description:'[number]',
    aliases:["temizle","clear","c"]
};