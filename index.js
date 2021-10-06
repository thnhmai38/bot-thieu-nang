const Discord = require('discord.js');
//const { Client, Collection } = require("discord.js");
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_VOICE_STATES"]});
const fs = require('fs');
module.exports = client;
const { readdirSync } = require('fs');
const { join } = require('path')
require('log-timestamp');
require("dotenv").config();
const colors = require("colors");
const { Player, QueryType, QueueRepeatMode } = require("discord-player");
const package = require('./package.json')

try {
    const jsonString = fs.readFileSync("./config.json");
    const config = JSON.parse(jsonString);

console.log(colors.yellow('Running Bot...'));
client.commands = new Discord.Collection();
const prefix = config.prefix; 
const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}

client.on ("error", console.error);
    client.on('ready', () => {    
        const dir = './commands';
    
        fs.readdir(dir, (err, files) => {
            let cmdcount = files.length;
            let i = 0;
        setInterval(() => {
            let activities = [`v${package.version}`,`/>help`,`/>invite`,`/>changelog`,`/>support`,`${client.guilds.cache.size} máy chủ`,`${client.channels.cache.size} kênh`,`${cmdcount} lệnh`]
            client.user.setActivity(`${activities[i ++ % activities.length]}`, {
                type: "STREAMING",
                url: "https://www.twitch.tv/thanhgaming5550",
        })
    }, 30000)
        //client.user.setActivity({
        //    name: "/>help ; />invite",
        //    type: "STREAMING",
        //    url: "https://www.twitch.tv/thanhgaming5550"
        //})
    console.log(colors.green(`Logged in as ${client.user.tag}!`));
    console.log(colors.green(`Online`));
    console.log(`Bot hiện đang ở ${client.guilds.cache.size} máy chủ, theo dõi ${client.channels.cache.size} kênh và phục vụ ${cmdcount} lệnh cho ${client.users.cache.size} người dùng`);
    console.log('==========================================================');
    });
});
/*/
client.player = new Player(client, {
    ytdlDownloadOptions: {
        filter: "audioonly"
    }
});
/*/
client.player = new Player(client);

client.player.on("error", (queue, error) => {
    console.log(colors.red(`Lỗi trong hàng đợi: ${error.message}`));
    queue.metadata.send(`❌ | Lỗi trong hàng đợi: ` + "`" + `${error.message}` + "`" + `. Vui lòng thử lại sau`)
});
client.player.on("connectionError", (queue, error) => {
    console.log(colors.red(`Lỗi kết nối: ${error.message}`));
    queue.metadata.send(`❌ | Lỗi kết nối: ` + "`" + `${error.message}` + "`" + `. Vui lòng thử lại sau`)
});

client.player.on("trackStart", (queue, track) => {
    queue.metadata.send(`🎶 | Bắt đầu phát **${track.title}** trong **${queue.connection.channel.name}**!`);
});

client.player.on("trackAdd", (queue, track) => {
    queue.metadata.send(`🎶 | Bài **${track.title}** đã được thêm vào hàng đợi!`);
});

client.player.on("botDisconnect", (queue) => {
    queue.metadata.send("❌ | Xóa hàng đợi do bị ngắt kết nối thủ công!");
});

client.player.on("channelEmpty", (queue) => {
    queue.metadata.send("❌ | Tự thoát do không có người nghe");
});

client.player.on("queueEnd", (queue) => {
    queue.metadata.send("**✅ | Đã phát xong!** *Nếu bài của bạn vẫn chưa được phát, vui lòng thử lại*");
});


client.on("messageCreate", async message => {
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        
        if(!client.commands.has(command)) return;

        try {
            client.commands.get(command).run(client, message, args);
            
        } catch (error){ 
            console.error(error);
        }
    }
});

process.on('uncaughtException', function (err) {
    console.log(colors.red('ĐÃ PHÁT HIỆN LỖI : ', err));
  });
client.login(process.env.TOKEN).then((token) => {
    // client.user is now defined
    client.user.setPresence({
     status: 'online',
    });
   });
} catch (err) {
    console.log(err);
    return;
}
