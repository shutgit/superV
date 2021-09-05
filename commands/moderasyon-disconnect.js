const config = require('../ayarlar.js');

module.exports.run = async(client, message, args) => {

    if (!message.member.hasPermission("877664528664514632")) return message.react(config.emoji.no);

    let members = message.guild.members.cache.filter(s => s.voice.channel && !s.user.bot)

    members.array().forEach(async(member, index) => {
        setTimeout(async() => {
            await member.voice.kick().catch()
        }, index * 750)
    })
message.react(config.emoji.yes);
};

exports.config = {
    name:'disconnectall',
    aliases:["herkesisestenat","herkesisestençıkar","discall"]
};