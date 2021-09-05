const { MessageEmbed } = require('discord.js');
const config = require('../ayarlar.js');

exports.run = async (client, message, args) => {

let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(!member) return message.channel.send(embed.setDescription(`Bir kullanıcı belirtmelisin.`)).sil(5)
    let kanal = member.voice.channel
    if(!kanal) return message.channel.send(embed.setDescription(`Belirttiğin kişi ses kanalında bulunmuyor.`)).sil(5)
let microphone = member.voice.selfMute ? "Kapalı" : "Açık";
let headphones = member.voice.selfDeaf ? "Kapalı" : "Açık";
let sestekiler = message.guild.channels.cache.get(kanal.id).members.map(x => x.user).join(", ")

kanal.createInvite().then(invite =>
message.channel.send(embed.setDescription(`
${member} kullanıcısı \`${kanal.name}\` kanalında.

**Mikrofon durumu:** \`${microphone}\`
**Kulaklık durumu:** \`${headphones}\`

[Kanala Gitmek İçin Tıkla](https://discord.gg/${invite.code})

\` > \` Odadaki kişiler; ${sestekiler}`)))
message.react(config.emoji.yes)
};

exports.config = {
    name:'nerede',
    description:'[@Orchi/OrchiID]',
    aliases:[]
};