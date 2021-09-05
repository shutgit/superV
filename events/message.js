const Discord = require("discord.js");
const ayarlar = global.config;
const staff = global.staffDB;
const cooldown = new Map();

module.exports = message => {

  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(global.config.bot.prefix)) return;
  let command = message.content.split(' ')[0].slice(global.config.bot.prefix.length);
  let embed = new Discord.MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(global.config.embed.footer)
  // if(message.channel.id !== ayarlar.kanallar.commandChannel) return message.reply(`<#${ayarlar.kanallar.commandChannel}> kanalında komut kullanabilirsin.`).sil(5)
  let params = message.content.split(' ').slice(1);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) { cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {

    if(cmd.config.perm === "Güvenli_Kişiler") {
      let StaffMembers = staff.get(`staffs.${message.guild.id}`)
      if(!StaffMembers.some(i=>i.staffID==message.author.id)) { 
        message.lineReply(embed.setDescription(`Komutu kullanmak için sunucunun güvenlik listesinde olmalısın.`))
        return
      }
    }

    if(message.author.id !== global.config.bot.sahip) {
      if (cooldown.has(message.author.id) && cooldown.get(message.author.id).komut == cmd.config.name && cooldown.get(message.author.id).zaman > Date.now()) return message.channel.send(new Discord.MessageEmbed().setDescription(`${message.author}, \`${cmd.config.name}\` komutu kullanabilmek için **${Math.floor((cooldown.get(message.author.id).zaman - Date.now()) / 1000)}** saniye beklemelisin.`).setColor('RANDOM')).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }));
      cooldown.set(message.author.id, { komut: cmd.config.name, zaman: Date.now() + cmd.config.cooldown });
  }

    cmd.run(client, message, params, embed, ayarlar);
  }

};