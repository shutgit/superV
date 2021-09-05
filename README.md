Selam, ben `Orchais. (Discord ID:792745122470166529)`

Öncelikle https://discord.gg/serendia - katılmayı unutmayın ;) <3

Şimdi sana botun kurulumunu, gerekli yerleri göstericem.

İlk başta *ayarlar.js* dosyasını doldurman gerek. 8 parçaya bölünüyor ve hepsini kendince editleyebilirsin.
Hiç bir yerde kendime ait isim bırakmadım sadece *ayarlar.js*'de var.
Sana herşeyin ID'sini, kurulumunu tek-tek göstericem;

**module.exports = { bot: {...}, }** bu kısımdan başlayalım,

"token":"token" olan yere oluşturduğun botun tokenini gir,
"sahip":"id" olan yere kendi id'ni gir,
"prefix":"prefix" olan yere kendi prefixini gir,
"ready":"" olan yere botun oynuyor kısmını gir,
"guildID":"sunucu id" olan yere sunucunun id'sini gir,
"guildVanityURL":"link" olan yere kendi sunucunun "vanity davet" || "sınırsız davet" linkini gir.

**module.exports = { embed: {...}, }**,
"footer":"" olan yere embedlerde küçük yazı olacak metni gir,
"color":"" olan yere embedin rengini gir, ayrıca *index.js* dosyasında farklı renkler **client.renk = global.renk** olarak tanımlanmıştır, global.renk.<renk> olarak girebilirsin.

**module.exports = { kanallar: {...}, }**,
Bu kısmı anlatmayacağım çünki bu kısım çok kolay sadece adı verilen kanalların id'sini giriceksin.

**module.exports = { roller: {...}, }**,
Aynı şekilde buraya da geçerli.

**module.exports = { puan: {...}, }**,
Buradaki ceza ve yetkili puanlarını kendinize göre düzenleyebilirsiniz.

**module.exports = { sistemler: {...}, }**,
<true/false> - <aç/kapat> kendinize göre açıp kapatabilirsiniz.

**module.exports = { emoji: {...}, }**,
Burada sizden 2 emoji isteniyor, *tik* ve *carpi*, tik emojisi ve çarpı emojisi. Aynı şekilde farklı emojiler *index.js* dosyasında
**client.emojiler = global.emojiler** olarak tanımlanmıştır, orayıda kendinize göre düzenleyin, yoksa hata verir.

**module.exports = { other: {...}, }**,
Buradaki "tag":"" olan yere sunucunuzun tagını giriyorsunuz, varsa "etikettag":"" olan yere discriminator tagınızı giriyorsunuz,
(Örnek: 0001)
"unTagged":"" olan kısmı öyle bırakın.

Geçelim **index.js** dosyasına;
**index.js** dosyasında kanal, rol, vb. id'si girilmedi, tüm id'ler **ayarlar.js**'den çekiliyor, **index.js**'de başta olan
*client.emojiler* ve *sayiEmojiler* olan yerleri düzenleyiniz.

Diğerleri;
Kayıt işlemleri ve ceza işlemleri **helpers/functions.js** dosyasından çekiliyor, sonra bana dm'den gelip sormayın :D

Her komutta *const { MesageEmbed } = require('discord.js'); const embed = new MessageEmbed()* yazmanıza gerek yok,
*embed* **message.js** dosyasından çekiliyor, ordan kendinize göre embedi ayarlayabilirsiniz.
Ha derseniz ki abi bu embedi nasıl kullanıcaz diye, örnek olarak;
────────────────────────────────────────────────────────────────

exports.run = async(client, message, args, embed) => { 

message.channel.send(embed.setDescription(`embed!`))

};

exports.config = {
    name:'test',
    aliases:[],
};

────────────────────────────────────────────────────────────────

Daha sonrasında her komutta *const ayarlar = require('ayarlar.js')* yazmanıza gerek yok, *const config = global.config;* yazın ve oradan çekin. Objeler örneklerde gözükmeyebilir.

Database olarak **wio.db** kullanıyorum, neden **mongoose** değil de **wio.db** kullanıyorumun sorusunun cevabı *mongo bilmiyorum :d*.
Veriler **databases/..** klasöründeki dosyalara kaydediliyor ve her sistemin kendi veri dosyası var.
