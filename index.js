const moment = require('moment');
const { Client, MessageEmbed, Collection } = require('discord.js');
require('discord-reply');
const { JsonDatabase } = require('wio.db');
const staff = global.staffDB = new JsonDatabase({ databasePath:'./databases/Staff.json' });
const register = global.registerDB = new JsonDatabase({ databasePath:'./databases/Register.json' });
const points = global.pointsDB = new JsonDatabase({ databasePath:'./databases/Points.json' });
const sicil = global.sicilDB = new JsonDatabase({ databasePath:'./databases/Sicil.json' });
const client = global.client = new Client({ fetchAllMembers:true });
const fs = require('fs');
require('./util/eventLoader.js')(client);

global.client = client;
const ayarlar = global.config = require('./ayarlar.js');
client.renk = global.renk = { "renksiz": "2f3136", "mor": "3c0149", "mavi": "10033d", "turkuaz": "00ffcb", "kirmizi": "750b0c", "yesil": "032221" };
client.emojiler = global.emojiler = { tik:"842668700322103306", carpi:"842668699730051104", byildiz:"838373473927168020", giris:"838373500913319947", cikis:"838373501379280906", loading:"835030959539224586" }
const sayiEmojiler = {
  0:"<a:0_:838373414187040787>", 1:"<a:1_:838373414015729694>", 2:"<a:2_:838373413998559242>", 3:"<a:3_:838373414187302932>",
  4:"<a:4_:838373413981650954>", 5:"<a:5_:838373414040764429>", 6:"<a:6_:838373413994627123>", 7:"<a:7_:838373414074449980>",
  8:"<a:8_:838373413693030431>", 9:"<a:9_:838373413747163147>"
}

/*                            HANDLERS                            */

client.commands = new Collection();
client.aliases = new Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  files.forEach(f => {
      let props = require(`./commands/${f}`);
      console.log(`[KOMUT]: ${props.config.name} yüklendi!`);
      client.commands.set(props.config.name, props);
      props.config.aliases.forEach(alias => {
          client.aliases.set(alias, props.config.name);
      });
  });
});

fs.readdir('./events/', (err, files) => { 
  if(err) console.error(err);
  files.forEach(files => { 
    console.log(`[EVENT]: ${files} yüklendi!`);
  });
});

/*                            FUNCTIONS                            */

Date.prototype.toTurkishFormatDate = function(format) {
  let date = this,
    day = date.getDate(),
    weekDay = date.getDay(),
    month = date.getMonth(),
    year = date.getFullYear(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();

  let monthNames = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
  let dayNames = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");

  if (!format) {
    format = "dd MM yyyy | hh:ii:ss";
  };
  format = format.replace("mm", month.toString().padStart(2, "0"));
  format = format.replace("MM", monthNames[month]);
  
  if (format.indexOf("yyyy") > -1) {
    format = format.replace("yyyy", year.toString());
  } else if (format.indexOf("yy") > -1) {
    format = format.replace("yy", year.toString().substr(2, 2));
  };
  
  format = format.replace("dd", day.toString().padStart(2, "0"));
  format = format.replace("DD", dayNames[weekDay]);

  if (format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
  if (format.indexOf("hh") > -1) {
    if (hours > 24) hours -= 24;
    if (hours === 0) hours = 24;
    format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
  };
  if (format.indexOf("ii") > -1) format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
  if (format.indexOf("ss") > -1) format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
  return format;
};

Promise.prototype.sil = function(time) {
  if (this) this.then(msg => {
      if (msg.deletable) msg.delete({ timeout: time * 1000 });
  });
};

client.emoji = function(x) {
  return client.emojis.cache.get(client.emojiler[x]);
};

global.emoji = client.emoji = function(x) {
  return client.emojis.cache.get(client.emojiler[x]);
};

client.emojiSayi = function(sayi) {
  var yeniMetin = "";
  var arr = Array.from(sayi);
  for (var x = 0; x < arr.length; x++) {
    yeniMetin += (sayiEmojiler[arr[x]] === "" ? arr[x] : sayiEmojiler[arr[x]]);
  }
  return yeniMetin;
};

/*                            EVENTS                            */

client.on("ready", async() => {
  client.channels.cache.get(ayarlar.kanallar.botVoice)
                       .join()
                       .then(console.log("[BOT]: Ses odasına bağlandı"))
                       .catch((err) => console.log(err));
});

client.on("guildMemberAdd", async member => {

  let user = client.users.cache.get(member.id);

  const kuruluş = user.createdAt.getTime();

let oluşturma = `${moment.duration(Date.now() - kuruluş).format('Y [Yıl], M [Ay], D [Gün]')}`

let güvenlik;
if(Date.now() - kuruluş < 1036800000 ? güvenlik = `Şüpheli` : güvenlik = `Güvenli`);


if(güvenlik === "Güvenli") {

  member.setNickname(ayarlar.other.unTagged + "✧ İsim | Yaş").catch((err) => console.log(err))
  member.roles.add(ayarlar.roller.unregisterRole).catch((err) => console.log(err))
  client.channels.cache.get(ayarlar.kanallar.welcomeRoom).send(`

\` > \` Hesabın **${moment(kuruluş).locale('tr').format('LL')}** tarihinde (\`${oluşturma} önce\`) kurulmuş, **${güvenlik} ${ayarlar.emoji.yes}**.

\` > \` Kayıt olmak için ${member.guild.channels.cache.get(ayarlar.kanallar.V_Confirmed1)} kanalına girip ses teyit vererek isim yaş söylemen yeterli.

\` > \` ${member.guild.roles.cache.get(ayarlar.roller.registerStaff)} rolündeki yetkililer seninle ilgilenecektir.

\` > \` Sunucu kurallarımız ${member.guild.channels.cache.get(ayarlar.kanallar.rulesChannel)} kanalında belirtilmiştir. Tüm kurallar yazılı değildir, biraz kibar olunuz.

\` > \` Seninle beraber **${member.guild.memberCount}** kişiye ulaştık, iyi eğlenceler :tada::tada::tada:.
  `).catch((err) => console.log(err))

}
if(güvenlik === "Şüpheli") { 
  member.setNickname(ayarlar.other.unTagged + " Şüpheli").catch((err) => console.log(err))
  member.roles.set([ayarlar.roller.suspecious]).catch((err) => console.log((err)))
  if(ayarlar.kanallar.welcomeRoom) return client.channels.cache.get(ayarlar.kanallar.welcomeRoom).send(`
  \` > \` ${ayarlar.emoji.no} ${member} adlı üye hesabı yeni olduğu için şüpheli hesap rolünü verdim.
  
  \` > \` Hesap oluşturma tarihi: **${moment(kuruluş).locale('tr').format('LL')}** tarihinde \`${oluşturma}\` önce.

  \` > \` Seninle beraber **${member.guild.memberCount}** kişiye ulaştık
  `)
}

}); 
  
client.on("messageUpdate", async(oldMessage, newMessage) => {

    const reklam = ["discord.gg/","https://discord.gg/",".gg/","gg/","discord.io"];
    if (reklam.some(word => newMessage.content.includes(word))) {
      try {
        if (!oldMessage.member.hasPermission("BAN_MEMBERS")) {
              oldMessage.delete();
}              
      } catch(err) {
        console.log(err);
      }
    }

  });

  client.on('userUpdate', async(old, nev) => {
    let guild = await (client.guilds.cache.get(ayarlar.bot.guildID))
    let uye = guild.members.cache.get(old.id)

    let embed = new MessageEmbed().setColor(ayarlar.embed.color).setFooter(ayarlar.embed.footer).setTimestamp()
    let tagrol = guild.roles.cache.get(ayarlar.roller.tagRole);
    let log = guild.channels.cache.get(ayarlar.kanallar.tagLog);
        if (old.username != nev.username || old.tag != nev.tag || old.discriminator != nev.discriminator) {

    if ([global.config.other.tag].some(tag => nev.tag.toLowerCase().includes(tag))) {
        if (!uye.roles.cache.has(global.config.tagRole)) {
            uye.roles.add(global.config.tagRole).catch(e => {});
            uye.setNickname(uye.displayName.replace(ayarlar.other.unTagged, ayarlar.other.tag)).catch(e => {});
            if (log) log.send(embed.setDescription(`${uye}, Adlı kullanıcı tagımızı alarak ailemize katıldı!`))
        } else {
            uye.setNickname(uye.displayName.replace(ayarlar.other.unTagged, ayarlar.other.tag)).catch(e => {});
        }

    } else {
        if (!uye.roles.cache.has(global.config.tagRole)) {
            uye.setNickname(uye.displayName.replace(ayarlar.other.tag, ayarlar.other.unTagged)).catch(e => {});
        } else {
            uye.roles.remove(uye.roles.cache.filter(s => s.position >= tagrol.position)).catch(e => {});
            uye.setNickname(uye.displayName.replace(ayarlar.other.tag, ayarlar.other.unTagged)).catch(e => {});
            if (log) log.send(embed.setDescription(`${uye}, Adlı kullanıcı tagımızı bırakarak ailemizden ayrıldı!`))

        }
    }
      }
});


  client.on("message", async message => {

    let links = message.content.match(/(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi);
    if (!links) return;
    if (message.deletable) message.delete();
  },
            
  );

  client.on("message", async message => {

    if(message.channel.type === "dm") return;
   let reklamlar = ["https://discord.gg/","gg/",".gg/","dc.gg/","discord.gg/","https://"]
   if(message.content.toLowerCase() === reklamlar)
   message.delete();
  
  }

  );

  client.on("messageDelete", async message => {

const snipe = new JsonDatabase({ databasePath:'./databases/Snipe.json' });

        if (message.author.bot) return;
        if (message.content.length > "200") {
          snipe.push(`snipe.${message.guild.id}`, {
                authors: message.author.username,
                contents: "Silinen mesaj 200 karakteri aşıyor!",
                tarih: Date.now()
            })
        } else {
          snipe.push(`snipe.${message.guild.id}`, {
                authors: message.author.username,
                contents: message.content,
                tarih: Date.now()
            })
        }
    })

/* Login */

 client.on("ready", async() => {

   client.user.setPresence({ activity: { name:ayarlar.bot.ready }, status:'dnd', type:'playing' })
  });

 client
      .login(process.env.token)
      .then((x) => console.log(`[BOT]: ${client.user.tag} profili ile başlatıldı!`))
      .catch((err) => console.error(err));
