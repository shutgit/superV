const Discord = require("discord.js");
const ayarlar = require('../ayarlar.js');
module.exports.run = async (client, message, args) => {       

    var Online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size;
    var Kayıtlı = message.guild.members.cache.filter(kayıt => !kayıt.roles.cache.has(ayarlar.roller.unregisterRole)).size;
    var Taglı = message.guild.members.cache.filter(u => u.user.username.includes(ayarlar.other.tag)).size;
    var Voice = message.guild.members.cache.filter(s => s.voice.channel).size;
    var Cezalı = message.guild.members.cache.filter(y => y.roles.cache.has(ayarlar.roller.jailRole)).size;
    var Muteli = message.guild.members.cache.filter(j => j.roles.cache.has(ayarlar.roller.mutedRole)).size;
    var Yetkili = message.guild.members.cache.filter(b => b.roles.cache.has(ayarlar.roller.registerStaff)).size;

    const embed = new Discord.MessageEmbed()
    .setColor('RANDOM').setFooter(ayarlar.embed.footer).setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
    .setTimestamp().setThumbnail(message.guild.iconURL({ dynamic:true }))
    .setDescription(`
\` > \` Sunucumuzda toplam \`${message.guild.memberCount}\`(\`${Online} Aktif\`) kullanıcı bulunmaktadır.
\` > \` Sunucumuzda toplam \`${Kayıtlı}\` kayıtlı kullanıcı bulunmaktadır.
\` > \` Ses kanallarında toplam \`${Voice}\` kullanıcı bulunmaktadır.
\` > \` Sunucumuzda toplam \`${Cezalı}\` cezalı, \`${Muteli}\` muteli kullanıcı bulunmaktadır.
\` > \` Sunucumuzda toplam \`${Yetkili}\` yetkili kullanıcı bulunmaktadır.
\` > \` Sunucumuzda isminde ${ayarlar.other.tag} tagını bulunduran toplam \`${Taglı}\` kullanıcı bulunmaktadır.
`);
message.delete();
message.channel.send({ embed:embed }).sil(25);

};

exports.config = {
    name:'say',
    description:'',
    aliases: []
};
