const Discord = require("discord.js");
const ayarlar = require('../ayarlar.js');

exports.run = async (client, message, args, ayar, emoji) => {

if(!message.member.roles.cache.has(ayarlar.roller.boosterRole)) return message.react(ayarlar.emoji.no);

  let boosternick = args.slice(0).join(' ');
  if(!boosternick) return message.reply("Yeni adını girmelisin.");
  message.member.setNickname(`${ayarlar.other.tag} ${boosternick}`);
    const emb = new Discord.MessageEmbed()
    .setAuthor(message.author.tag,  message.author.avatarURL({dynamic: true}))
    .setTimestamp()
    .setColor("RANDOM")
    .setDescription(`**${ayarlar.beyazyldz} Takma adın başarıyla \`${boosternick}\` olarak değiştirildi!**`)
    message.channel.send(emb);
    message.react(ayarlar.emoji.yes);
}

exports.config = {
    name:'zengin',
    description:'[nick]',
    aliases: ["boosternick", "rich"]
};