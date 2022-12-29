const { Client, GatewayIntentBits, OAuth2Scopes, Partials, Collection, Routes } = require('discord.js')

const client = global.client = new Client({
     fetchAllMembers: true,
     intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMembers,GatewayIntentBits.GuildBans,GatewayIntentBits.GuildEmojisAndStickers,GatewayIntentBits.GuildIntegrations,GatewayIntentBits.GuildWebhooks,GatewayIntentBits.GuildInvites,GatewayIntentBits.GuildVoiceStates,GatewayIntentBits.GuildPresences,GatewayIntentBits.GuildMessages,GatewayIntentBits.GuildMessageReactions,GatewayIntentBits.GuildMessageTyping,GatewayIntentBits.MessageContent],
     scopes:[OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],
     partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User,Partials.GuildMember, Partials.ThreadMember, Partials.GuildScheduledEvent],
     ws: {version: "10"}
    });

///Modüller ve tanımlar.

const { Bot } = require('./shiConfig')
const token = Bot.shiToken; 
const clientID = Bot.shiClientID

const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { readdirSync, readdir } = require('node:fs');

const rest = new REST({version: 10}).setToken(token); 

client.commands = new Collection();
const slashCommands = []; // shi.

///Handler - yükleyiciler

const komutKlasor = path.join(__dirname, 'src/commands');
const komutDosya = fs.readdirSync(komutKlasor).filter(shi => shi.endsWith(".js"));

for( const shi of komutDosya ) {
    const dosyaKonum = path.join(komutKlasor, shi);
    const komut = require(dosyaKonum);

    client.commands.set(komut.data.name, komut);
    slashCommands.push(komut.data.toJSON());

    console.log(`🧡 ${komut.data.name} isimli komut başarıyla yüklendi - Shi.`)
}


readdir("./src/events", (err, shiFile) => {
    if(err) return console.error("Bir hata oluştu.", err);
    shiFile.filter((file) => file.endsWith(".js")).forEach((file) => {
        let shi_prop = require(`./src/events/${file}`);
        if(!shi_prop.conf) return;
        client.on(shi_prop.conf.name, shi_prop);
        console.log("📚 "+shi_prop.conf.name+" isimli etkinlik yüklendi!")
    })
}) 




client.login(token).then(shi => {
    console.log(`🟢 ${client.user.tag} başarıyla giriş yaptı!`)
    
    rest.put(Routes.applicationCommands(clientID), {body: slashCommands}).then(shi => {
        console.log("🧡 "+shi.length+" adet komut yükleniyor.");
    }).catch(err => console.error(err))

}).catch(err => console.error("Discord bot tokeninde bi' hata bulunmakta."));