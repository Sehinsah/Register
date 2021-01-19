const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} komut yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.token)

//-----------------------GİRENE-ROL-VERME----------------------\\

client.on("guildMemberAdd", member => {
  member.roles.add('800373369840074797'); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});

//-----------------------GİRENE-ROL-VERME----------------------\\

//------------------------HOŞGELDİN-MESAJI-----------------------\\ 

client.on("guildMemberAdd", member => {
    require("moment-duration-format")
      var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
            '0': `<a:0_:793344535895343124>`,
            '1': `<a:1_:793344535098032129>`,
            '2': `<a:2_:793344536621088818>`,
            '3': `<a:3_:793344536692260874>`,
            '4': `<a:4_:793344537120079882>`,
            '5': `<a:5_:793344536918360084>`,
            '6': `<a:6_:793344526756347924>`,
            '7': `<a:7_:793344536852168775>`,
            '8': `<a:8_:793344536960696320>`,
            '9': `<a:9_:793344537430327317>`}[d];})}
    const kanal = member.guild.channels.cache.find(r => r.id === "800373344976502835");
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
     const gecen = moment.duration(kurulus).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
    var kontrol;
  if (kurulus < 1296000000) kontrol = '<a:hayir:793345066315677726> Hesap Durumu: Güvenilir Değil.'
  if (kurulus > 1296000000) kontrol = '<a:greenload:793345867523424256> Hesap Durumu: Güvenilir Gözüküyor.'
    moment.locale("tr");

    kanal.send(`**
\`˃\` <a:chromastar:793345900718194699> Sunucumuza hoş geldin <@`+ member + `>, hesabın \``+gecen+`\` tarihinde oluşturulmuş ve `+kontrol+`

     \`˃\` <a:alev:793345110078783489> Kayıt olmak için \`Confirmation\` odalarına geçip <@&800373404070838272> yetkilisine teyit vererek kayıt olabilirsin.

          \`˃\` <a:ayarlar:793345873325064274> Sunucumuz \`Quatoˊ ya da ⛧\` tagını kullanıcı adına ekleyerek bizelerden birisi olabilirsin.

     \`˃\` <a:tac2:793345110036840510> Seninle beraber sunucumuz toplam `+üyesayısı+ ` kişiye ulaştı bizi şereflendirdin ! 

\`˃\` <a:kalp:793345111542071316> İçerize keyifli vakitler geçirmeni diler, sunucumuzun <#800222184458551306> kısmına göz atmanı tavsiye ederiz.**

\`˃\` https://cdn.discordapp.com/attachments/800373409497481226/800979942309494794/standard_2.gif `)});
  

//------------------------HOŞGELDİN-MESAJI-----------------------\\

//TAG ALANA ROL //

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = 'Quatoˊ'
  const sunucu = '793304412294611056'
  const kanal = '800373460114735104'
  const rol = '800373382419447819'

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${newUser} ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`**Selam ${newUser.username}, Sunucumuzda ${tag} Tagımızı Aldığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Sana Verdim!**`)
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RED").setDescription(`${newUser} ${tag} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`**Selam **${newUser.username}**, Sunucumuzda ${tag} Tagımızı Çıkardığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Senden Aldım!**`)
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
});

//TAG ALANA ROL2 //

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = '⛧'
  const sunucu = '793304412294611056'
  const kanal = '800373460114735104'
  const rol = '800373377935605790'

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${newUser} ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`**Selam ${newUser.username}, Sunucumuzda ${tag} Tagımızı Aldığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Sana Verdim!**`)
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RED").setDescription(`${newUser} ${tag} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`**Selam **${newUser.username}**, Sunucumuzda ${tag} Tagımızı Çıkardığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Senden Aldım!**`)
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
});

//------------------------ŞÜPHELİ-HESAP-----------------------\\

client.on("guildMemberAdd", member => {
    var moment = require("moment")
    require("moment-duration-format")
    moment.locale("tr")
     var {Permissions} = require('discord.js');
     var x = moment(member.user.createdAt).add(7, 'days').fromNow()
     var user = member.user
     x = x.replace("birkaç saniye önce", " ")
     if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
    const kytsz = member.guild.roles.cache.find(r => r.id === "800373369840074797") 
     var rol = member.guild.roles.cache.get("800373368665800724") // ŞÜPHELİ HESAP ROLÜNÜN İDSİNİ GİRİN
     var kayıtsız = member.guild.roles.cache.get(kytsz) // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
     member.roles.add(rol)
     member.roles.remove(kytsz)

  member.user.send('**<a:bekle:793345065888120842> Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır.**')
  setTimeout(() => {
  
  }, 1000)
  
  
     }
          else {
  
          }
      });

//------------------------ŞÜPHELİ-HESAP-----------------------\\

client.on("guildMemberAdd", member => {
member.setNickname(`⛧ İsim | Yaş`) 
}) ;
;

client.on("ready", async function() {
const voiceChannel = "800373351021150219"
client.channels.cache.get(voiceChannel).join()
.catch(err => {
throw err;
})
})

const Constants = require('discord.js/src/util/Constants.js')
Constants.DefaultOptions.ws.properties.$browser = 'Discord iOS'

client.on('message', msg => {
const bayraqyasak = msg.member.user.username.includes('Râte');
if(bayraqyasak){
  msg.member.ban()
  return;
}
});

client.on('message', msg => {
const bayraqyasak = msg.member.user.username.includes('ʳᵉˢᵗ');
if(bayraqyasak){
  msg.member.ban()
  return;
}
});

client.on('message', msg => {
const bayraqyasak = msg.member.user.username.includes('✮');
if(bayraqyasak){
  msg.member.ban()
  return;
}
});

client.on('message', msg => {
const bayraqyasak = msg.member.user.username.includes('⍫');
if(bayraqyasak){
  msg.member.ban()
  return;
}
});