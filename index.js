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
const package = require('./package.json')
const DisTube = require("distube")
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { SpotifyPlugin } = require('@distube/spotify');

try {
    console.log(colors.yellow('Running Bot...'));

    const jsonString = fs.readFileSync("./config.json");
    const config = JSON.parse(jsonString);
    client.commands = new Discord.Collection();

    const prefix = config.prefix; 
    client.emotes = config.emoji;

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

    client.distube = new DisTube.default(client, {
        searchSongs: 0,
        searchCooldown: 30,
        leaveOnEmpty: true,
        emptyCooldown: 60,
        leaveOnFinish: false,
        leaveOnStop: false,
        plugins: [new SoundCloudPlugin(), new SpotifyPlugin()],
    })
    const status = queue => `Âm lượng: ${queue.volume}% | Bộ lọc: ${queue.filters.length === 0 ? "Tắt" : queue.filters} | Lặp: ${queue.repeatMode ? queue.repeatMode === 2 ? "Tất cả" : "Bài này" : "Tắt"} | Tự động phát: ${queue.autoplay ? "Bật" : "Tắt"}`
    client.distube
        .on("error", (channel, error) => {
            console.log(colors.red(error));
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(`${client.emotes.error} | Đã xảy ra lỗi`)
                .setDescription(`${error}`)
                .setTimestamp()
                .setFooter('Vui lòng thử lại sau', `https://i.imgur.com/hfTBpOg.gif`);
            channel.send({embeds : [exampleEmbed]});
        })
        .on("addSong", (queue, song) => {
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#800080')
                .setAuthor(`${client.emotes.success} | Đã thêm bài nhạc`)
                .setTitle(`${song.name}`)
                .setURL(`${song.url}`)
                .setThumbnail(`${song.thumbnail}`)
                .addField('Thời lượng', `${song.formattedDuration}`, true)
                .addField('Lượt xem', `${song.views}`,true)
                .addField('Lượt Thích', `${song.likes}`,true)
                .addField('Lượt không thích', `${song.dislikes}`, true)
                .setTimestamp()
                .setFooter(`Yêu cầu bởi : ${song.user.tag}`,`https://i.imgur.com/hfTBpOg.gif`);
            queue.textChannel.send({embeds : [exampleEmbed]});
        })
        .on("playSong", (queue, song) => {
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setAuthor(`${client.emotes.play} | Bắt đầu phát bài nhạc`)
                .setTitle(`${song.name}`)
                .setURL(`${song.url}`)
                .setThumbnail(`${song.thumbnail}`)
                .addField('Thời lượng', `${song.formattedDuration}`, true)
                .addField('Lượt xem', `${song.views}`, true)
                .addField('Lượt Thích', `${song.likes}`, true)
                .addField('Lượt không thích', `${song.dislikes}`, true)
                .setTimestamp()
                .setFooter(`${status(queue)} | Yêu cầu bởi : ${song.user.tag}`, `https://i.imgur.com/hfTBpOg.gif`);
            queue.textChannel.send({
                embeds: [exampleEmbed]
            });
        })
        .on("addList", (queue, playlist) => {
            var songlist = [];
            for (let i = 0; i < playlist.songs.length; i++) {
                songlist[i] = `${i+1}. [${playlist.songs[i].name}](${playlist.songs[i].url})` + " -** `" + playlist.songs[i].formattedDuration + "`**";
            }
            const song = songlist.join('\n');
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#800080')
                .setAuthor(`${client.emotes.success} | Đã thêm danh sách phát`)
                .setTitle(`${playlist.name}`)
                .setURL(`${playlist.url}`)
                .setThumbnail(`${playlist.thumbnail}`)
                .setDescription(`**Gồm các bài:** \n ${song} \n\n *Tổng thời lượng : ${playlist.formattedDuration}*`)
                .setTimestamp()
                .setFooter(`Yêu cầu bởi : ${playlist.user.tag}`, `https://i.imgur.com/hfTBpOg.gif`);
            queue.textChannel.send({embeds : [exampleEmbed]});
        })
        /*/
        .on("searchResult", (message, results) => {
            let i = 0
            message.channel.send(`**Nhập STT bài hát bạn muốn phát: **\n${results.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Tự động hủy sau 30s*`)
        })
        .on("searchCancel", message => message.channel.send(`${client.emotes.error} | Hủy tìm kiếm`))
        .on('searchInvalidAnswer', message => message.channel.send(`${client.emotes.error} | Tìm kiếm không hợp lệ`))
        .on('searchNoResult', message => message.channel.send(`${client.emotes.error} | Không có kết quả tìm kiếm`))
        /*/
        .on('finish', queue => {
            queue.textChannel.send(`${client.emotes.success} | Đã phát xong`)
        })
        .on('finishSong', queue => queue.textChannel.send(`${client.emotes.success} | Đã phát xong bài`))
        .on('disconnect', queue => queue.textChannel.send(`${client.emotes.success} | Đã thoát kênh`))
        .on('empty', queue => queue.textChannel.send(`${client.emotes.queue} | Danh sách chờ đã Trống. Tự động thoát sau 60s`))
        .on('deleteQueue', queue => {
            queue.textChannel.send(`${client.emotes.queue} | Đã xóa danh sách chờ`)
        })

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
        client.user.setPresence({
        status: 'online',
        });
    });
} catch (err) {
    console.log(err);
    return;
}
