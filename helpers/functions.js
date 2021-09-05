const { MessageEmbed, Client, Collection } = require('discord.js');
const client = new Client({ fetchAllMembers:true });
const config = global.config;
const { JsonDatabase } = require('wio.db');
const register = global.registerDB = new JsonDatabase({ databasePath:'./databases/Register.json' });
const puanlar = global.pointsDB = new JsonDatabase({ databasePath:'./databases/Points.json' });
const sicil = global.sicilDB = new JsonDatabase({ databasePath:'./databases/Sicil.json' });
const jailroles = new JsonDatabase({ databasePath:'./databases/JailRolesData.json' });
const staff = new JsonDatabase({ databasePath:'./databases/Staff.json' });
const message = require('../events/message');
const ms = require('ms');
const moment = require('moment');
require('moment-duration-format');

class Register {
    
    static async erkek(member, admin, nickname) {
        await member.roles.add(config.roller.manRoles).catch((err) => console.log(err));
        await member.roles.remove(config.roller.unregisterRole).catch((err) => console.log(err));
        await member.setNickname(nickname).catch((err) => console.log(err));
        await register.push(`isimler.${member.id}`, { isim:nickname, gender:"WOMAN", yetkili:admin.id, zaman:Date.now() });
        await register.add(`kayıt.${admin.id}.e`, 1);
        await register.add(`kayıt.${admin.id}.t`, 1);
        const isimveri = register.get(`isimler.${member.id}`);
        isimveri.length > 0 ? isimveri.map((value, index) => `\`${index +1}.\` \`${value.isim}\` \`|\` Yetkili: **(**<@${value.yetkili}>**)** \`|\` Tarih: \`${new Date(value.zaman).toTurkishFormatDate()}\``).slice(isimveri.length > 10 ? isimveri.length - 10 : 0, isimveri.length).join('\n') : "*Kullanıcı daha önceden kayıt olmamış..**";
        if(member.user.username.inclues(config.other.tag)) member.roles.add(config.roller.tagRole);  
    }
    
    static async kız(member, admin, nickname) {
        await member.roles.add(config.roller.womanRoles).catch((err) => console.log(err));
        await member.roles.remove(config.roller.unregisterRole).catch((err) => console.log(err));
        await member.setNickname(nickname).catch((err) => console.log(err));
        await register.push(`isimler.${member.id}`, { isim:nickname, gender:"WOMAN", yetkili:admin.id, zaman:Date.now() });
        await register.add(`kayıt.${admin.id}.k`, 1);
        await register.add(`kayıt.${admin.id}.t`, 1);
        const isimveri = register.get(`isimler.${member.id}`);
        isimveri.length > 0 ? isimveri.map((value, index) => `\`${index +1}.\` \`${value.isim}\` \`|\` Yetkili: **(**<@${value.yetkili}>**)** \`|\` Tarih: \`${new Date(value.zaman).toTurkishFormatDate()}\``).slice(isimveri.length > 10 ? isimveri.length - 10 : 0, isimveri.length).join('\n') : "*Kullanıcı daha önceden kayıt olmamış..**";
        if(member.user.username.includes(config.other.tag)) member.roles.add(config.roller.tagRole);
    }

    static async kayıtsız(member) { 
        await member.roles.set([config.roller.unregisterRole]).catch((err) => console.log(err));
        await member.setNickname(`✧ İsim | Yaş`)
    }

}

class Penal { 

        static async mute(member, admin, reason, süre) {
        await member.roles.add(config.roller.mutedRole).catch((err) => console.log(err))
        await sicil.push(`sicil.${member.id}`, { Type: "CMUTE", Staff: admin.id, Date: Date.now(), Reason: reason })
        await puanlar.add(`cezapuan.${member.id}`, config.puan.mutePoint)
        await puanlar.add(`yetkilipuan.${admin.id}`, config.puan.staffMute)
        await puanlar.add(`cezaid`, 1)

        setTimeout(async() => {
           await member.roles.remove(config.roller.mutedRole).catch((err) => console.log(err))
         }, ms(süre))
    }

        static async unmute(member, admin) {
            await member.roles.remove(config.roller.mutedRole).catch((err) => console.log(err))
            await sicil.push(`sicil.${member.id}`, { Type:"UNMUTE", Staff:admin.id, Date: Date.now(), Reason:"" })
        }

        static async jail(member, admin, reason, süre) {
        await member.roles.cache.forEach(y => jailroles.push(`rolleri.${member.id}`, y.id))
        await member.roles.set([config.roller.jailRole]).catch((err) => console.log(err))
        await sicil.push(`sicil.${member.id}`, { Type: "JAİL", Staff: admin.id, Date: Date.now(), Reason: reason })
        await puanlar.add(`cezapuan.${member.id}`, config.puan.jailPoint)
        await puanlar.add(`yetkilipuan.${admin.id}`, config.puan.staffJail)
        await puanlar.add(`cezaid`, 1)

        setTimeout(async() => {
            let y = await jailroles.get(`rolleri.${member.id}`)
            if(!y) return;
            await member.roles.add(y)
            await jailroles.delete(`rolleri.${member.id}`)
        }, ms(süre))
        }
}

module.exports = { Register, Penal };