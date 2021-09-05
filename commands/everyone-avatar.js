const Discord = require('discord.js');

exports.run = async(client, message, args) => {

let embed = new Discord.MessageEmbed().setColor(0x2f3136);
let victim = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
let avatar = victim.avatarURL({ dynamic: true, size: 2048 });

embed.setColor("#2F3136")
.setAuthor(victim.tag, avatar)
.setFooter(`${message.member.displayName} tarafından istendi!`, message.author.avatarURL({ dynamic: true }))
.setDescription(`[Resim Adresi](${avatar})`)
.setImage(avatar)
message.channel.send(embed).sil(10).catch(c => console.log())

};

exports.config = {
    name:'avatar',
    aliases:["pp",'av'],
    desciption:'[@Orchi/OrchiID]'
};