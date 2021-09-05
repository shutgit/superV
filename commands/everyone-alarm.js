const { MessageEmbed } = require('discord.js');
const ayarlar = require('../ayarlar.js');
const ms = require('ms');
const moment = require('moment')
require('moment-duration-format')
moment.locale("tr");

exports.run = async(client, message, args, embed) => {

    let alarmSüre = args[0]
    if(!alarmSüre) return message.reply(embed.setDescription(`Alarm kurmak için geçerli bir süre gir! \`${ayarlar.bot.prefix}${this.ayarlar.name} [süre]\``))

    if(alarmSüre) { 
        message.channel.send(embed.setDescription(`${message.author}, alarmını ${moment(Date.now()+alarmSüre)} tarihine kurdun.`))
    
    setTimeout(async() => {
        message.author.send(`:alarm_clock: Alarm!`)
    }, ms(alarmSüre))

    }
};

exports.config = {
    name:'alarm',
    aliases:[],
    description:'[time]',
    cooldown:10000
}