const { MessageEmbed } = require('discord.js');
const config = global.config;

exports.run = async(client, message, args) => {

   let mesaj = await message.channel.send(new MessageEmbed() .setDescription(`Botun toplamda **${client.commands.size}** komutu bulunmakta.`))

   setTimeout(async() => {
   mesaj.edit(
        new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
        .setColor("032221")
        .setDescription(client.commands.array().map(x => `\`${config.bot.prefix}${x.config.name} ${x.config.description ||''}\``)
        ))
   }, 2500)

};

exports.config = {
    name:'help',
    aliases:["yardım","h","y"]
};