const config = global.config;
const staff = global.staffDB;

run = async(client, message, args, embed) => { 

if(message.author.id !== config.bot.sahip) return message.lineReply(embed.setDescription(`Komutu sadece ${client.users.cache.get(config.bot.sahip)} üyesi kullanabilir.`)).sil(5);

let işlem = args[0];
if(!işlem) return message.lineReply(embed.setDescription(`${client.emojis.cache.get(global.emojiler.carpi)} Eksik argüman. \`${config.bot.prefix}${this.config.name} liste / ekle [@Orchi/OrchiID] / çıkar [@Orchi/OrchiID]\``)).sil(5);

if(işlem === "liste") {
    let data = staff.get(`staffs.${message.guild.id}`)
    if(!data) return message.lineReply(embed.setDescription(`Malesef veri yok.`)).sil(5);
    let staffData = data.map((value, index) => `\`${index+1}.\` ${message.guild.members.cache.get(value.staffID)} **${new Date(value.Date).toTurkishFormatDate()}** Tarihinde alınmış`) 
    message.lineReply(embed.setDescription(`
    ${client.emojis.cache.get(global.emojiler.loading)} Sunucuda güvenlik listesinde olan kişiler;
    ─────────────────────────
    ${staffData.join("\n")}
    `))
}

if(işlem === "ekle") { 
    let member = message.mentions.members.first()
    if(!member) return message.lineReply(embed.setDescription(`Üye etiketle.`)).sil(5);

    if(member) {
        message.channel.send(embed.setDescription(`${global.emojiler.tik} ${message.guild.members.cache.get(member.id)} üyesi güvenlik listesine eklendi.`))
        staff.push(`staffs.${message.guild.id}`, { staffID: member.id, Date: Date.now() });
    }
}

if(işlem === "çıkar") { 
    let member = message.mentions.members.first()
    if(!member) return message.lineReply(embed.setDescription(`Üye etiketle.`)).sil(5);

    if(member) { 
        message.channel.send(embed.setDescription(`${client.emojis.cache.get(global.emojiler.tik)} ${message.guild.members.cache.get(member.id)} üyesi güvenlik listesinden çıkarıldı.`))
        staff.pull(`staffs.${message.guild.id}`,(e) => e.staffID === member.id)
    }
}

};

exports.config = {
    name:'güvenlik',
    aliases:[],
    description:'[ekle ]'
};