const Discord = require('discord.js');
const conf = require('../ayarlar.js');
exports.run = async(client, message, args) => {
 
message.reply(`\`${conf.other.tag}\``).sil(10)

};

exports.config = {
    name:'tag',
    aliases : [],
};