const Discord = require('discord.js');
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_VOICE_STATES"]});
const fs = require('fs');
module.exports = client;
const { readdirSync } = require('fs');
const { join } = require('path')
require('log-timestamp')(function() { return "[" + new Date().toLocaleString(`en-GB`,  { timeZone: 'Asia/Ho_Chi_Minh' }) + "] "});
require("dotenv").config();
const colors = require("colors");
const package = require('./package.json')
const DisTube = require("distube")
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { SpotifyPlugin } = require('@distube/spotify');
client.slash = new Discord.Collection()
const { Routes } = require("discord-api-types/v9")
const { REST } = require("@discordjs/rest")
const { YtDlpPlugin } = require("@distube/yt-dlp");

    console.log(colors.bold(colors.cyan('Preparing and Running...')));

    const jsonString = fs.readFileSync("./config.json");
    const config = JSON.parse(jsonString);
    client.commands = new Discord.Collection();

    const prefix = config.prefix; 
    client.emotes = config.emoji;

    const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));
    
    const cmdcount = fs.readdirSync('./commands').length;
    const slscount = fs.readdirSync('./slash').length;
    
    console.log(colors.bold(colors.yellow(`Starting load Commands...`)))
    var loaded = true; var count = 0;
    for (const file of commandFiles) {
        const command = require(join(__dirname, "commands", `${file}`));
        try {
            client.commands.set(command.name, command) 
            count++;
            let text = colors.yellow(`[Command] `) + colors.green(`[${count}/${cmdcount}] Loaded ${file}`);
            console.log(text);
        } catch {
            let text = colors.yellow(`[Command] `) + colors.red(`[${count}/${cmdcount}] Unloaded ${file}`);
            loaded = false;
            console.log(text);
        }
    }
    loaded ? console.log(colors.bold(colors.green(`Loaded all Commands!`))) : console.log(colors.bold(colors.red(`Load all Commands Falled!`)))
    
    const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);
    count = 0;
    console.log(colors.bold(colors.yellow(`Starting load Slash Commands...`)))
    const slashFiles = readdirSync(join(__dirname, "slash")).filter(file => file.endsWith(".js"));
    const arrayOfSlashCommands = [];
    for (const file of slashFiles) {
        const command = require(join(__dirname, "slash", `${file}`));
        try {
            client.slash.set(command.name, command)
            arrayOfSlashCommands.push(command);
            count++
            let text = colors.yellow(`[Slash] `) + colors.green(`[${count}/${slscount}] Loaded ${file}`);
            console.log(text);
        } catch {
            let text = colors.yellow(`[Slash] `) + colors.red(`[${count}/${slscount}] Unloaded ${file}`);
            loaded = false;
            console.log(text);
        }
    }
    (async () => {
        try {
            await rest.put(
                Routes.applicationCommands(process.env.clientID),
                    { body: arrayOfSlashCommands }
                )
            console.log(colors.bold(colors.green(`Loaded all Slash Commands!`)))
        } catch (error) {
            console.error(colors.red(error))
            console.log(colors.bold(colors.red(`Load all Slash Commands Falled!`)))
        }
    })();

    client.on ("error", console.error);

    client.on('ready', () => {
        let i = 0;
        setInterval(() => {
            let activities = [`v${package.version}`,`/>help`,`/>invite`,`/>changelog`,`/>support`,`${client.guilds.cache.size} máy chủ`,`${client.channels.cache.size} kênh`,`${cmdcount} lệnh chữ`, `${slscount} lệnh gạch chéo`, `${client.users.cache.size} người dùng`]
            client.user.setActivity(`${activities[i ++ % activities.length]}`, {
                type: "LISTENING",
            })
            /*
            client.user.setActivity(`${activities[i ++ % activities.length]}`, {
                type: "STREAMING",
                url: "https://www.twitch.tv/thanhgaming5550",
            })
            */
        }, 30000)
            //client.user.setActivity({
            //    name: "/>help ; />invite",
            //    type: "STREAMING",
            //    url: "https://www.twitch.tv/thanhgaming5550"
            //})
            /*
            console.log('=========================================================================================================');
            client.guilds.cache.get("") // Leave Guild
                .leave()
                .then((g) => {console.log("Leaved "+g)})
                
            client.guilds.cache.forEach(async guild => { // Check Guild and Member
                    {
                        console.log(`Bot đang ở ${guild.name} (${guild.id}) có ${guild.memberCount} người`);
                        //await guild.leave()
                    }
                })
            
            console.log('=========================================================================================================');
            */    
        console.log(colors.bold(colors.green(`Logged in as ${client.user.tag}!`)));
        console.log(colors.green(`Online`));
        console.log(`Bot hiện đang ở ${client.guilds.cache.size} máy chủ, theo dõi ${client.channels.cache.size} kênh và phục vụ ${cmdcount} lệnh chữ và ${slscount} lệnh gạch chéo cho ${client.users.cache.size} người dùng`);
        console.log('=========================================================================================================');
    });

    client.distube = new DisTube.DisTube(client, {
        searchSongs: 5,
        searchCooldown: 30,
        leaveOnEmpty: true,
        emptyCooldown: 60,
        leaveOnFinish: true,
        leaveOnStop: true,
        savePreviousSongs: true,
        youtubeDL: false,
        nsfw: true,
        plugins: [new SoundCloudPlugin(), new YtDlpPlugin(), new SpotifyPlugin()],
    })
    client.distube
        .on("error", (channel, error) => {
            console.log(colors.red(error));
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor({name: `${client.emotes.error} | Đã xảy ra lỗi`})
                .setDescription(`\n${error}\n\`Hãy thử lại một lần nữa hoặc đợi một lúc rồi thử lại! Nếu vấn đề vẫn chưa được khắc phục, liên hệ với chủ Bot bằng */>support*\``)
                .setTimestamp()
            channel.send({embeds : [exampleEmbed]});
        })
        .on("addSong", (queue, song) => {
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#800080')
                .setAuthor({name: `${client.emotes.success} | Đã thêm bài nhạc`})
                .setTitle(`${song.name}`)
                .setURL(`${song.url}`)
                .setThumbnail(`${song.thumbnail}`)
                .addField('Lượt xem', `${new Intl.NumberFormat('en-US').format(song.views)}`, true)
                .addField('Lượt thích', `${new Intl.NumberFormat('en-US').format(song.likes)}`, true)
                .addField('Yêu cầu bởi', `${song.user}`, true)
                .addField('Người tải lên', `[${song.uploader.name}](${song.uploader.url})`, true)
                .addField('Thời lượng', `${song.isLive ? "LIVE" : song.formattedDuration}`, true)
                .addField('Âm lượng', `${queue.volume}%`, true)
                .addField('Lặp', `${queue.repeatMode ? queue.repeatMode === 2 ? "Tất cả" : "Đơn bài" : "Tắt"}`, true)
                .addField('Tự động phát', `${queue.autoplay ? "Bật" : "Tắt"}`, true)
                .addField('Filter', `\`${queue.filters.length === 0 ? "Tắt" : queue.filters.join(", ")}\``, true)
                .setTimestamp()
            console.log(colors.yellow(queue.id +` | Thêm bài "${song.name}"/${song.url}`));
            queue.textChannel.send({embeds : [exampleEmbed]});
        })
        .on("playSong", (queue, song) => {
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setAuthor({name: `${client.emotes.success} | Bắt đầu phát bài nhạc`})
                .setTitle(`${song.name}`)
                .setURL(`${song.url}`)
                .setThumbnail(`${song.thumbnail}`)
                .addField('Lượt xem', `${new Intl.NumberFormat('en-US').format(song.views)}`, true)
                .addField('Lượt thích', `${new Intl.NumberFormat('en-US').format(song.likes)}`, true)
                .addField('Yêu cầu bởi', `${song.user}`, true)
                .addField('Người tải lên', `[${song.uploader.name}](${song.uploader.url})`, true)
                .addField('Thời lượng', `${song.isLive ? "LIVE" : song.formattedDuration}`, true)
                .addField('Âm lượng', `${queue.volume}%`, true)
                .addField('Lặp', `${queue.repeatMode ? queue.repeatMode === 2 ? "Tất cả" : "Đơn bài" : "Tắt"}`, true)
                .addField('Tự động phát', `${queue.autoplay ? "Bật" : "Tắt"}`, true)
                .addField('Filter', `\`${queue.filters.length === 0 ? "Tắt" : queue.filters.join(", ")}\``, true)
                .setTimestamp()
            console.log(colors.blue(queue.id +` | Phát bài "${song.name}"/${song.url} | Queue có ${(queue.song === undefined ? 0 : queue.song.length())+1} bài`));
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
                .setAuthor({name: `${client.emotes.success} | Đã thêm danh sách phát`})
                .setTitle(`${playlist.name}`)
                .setURL(`${playlist.url}`)
                .setThumbnail(`${playlist.thumbnail}`)
                .setDescription(`**Gồm các bài:** \n${song}\n`)
                .addField('Tổng thời lượng', `${playlist.formattedDuration}`, true)
                .addField('Yêu cầu bởi', `${playlist.user}`, true)
                .setTimestamp()
            console.log(colors.yellow(queue.id +` | Thêm Playlist "${playlist.name}"/${playlist.url}`));
            queue.textChannel.send({embeds : [exampleEmbed]});
        })
        
        .on("searchResult", (message, results, query) => {
            let i = 0;
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor(`GREEN`)
                .setTimestamp()
                .setAuthor({name: `${client.emotes.search} | Kết quả tìm kiếm cho "${query}"`})
                .setTitle(`Gửi số thứ tự bài bạn muốn phát tương ứng`)
                .setThumbnail(`${results[0].thumbnail}`)
                .setDescription(`\n${results.map(song => `**${++i}**. [${song.name}](${song.url}) - \`${song.isLive ? "LIVE" : song.formattedDuration}\``).join("\n")}\n\n*Yêu cầu bởi: ${message.author}*`)
                .setFooter({text: `Tự động hủy sau 30s`, iconURL:"https://www.iconpacks.net/icons/2/free-youtube-logo-icon-2431-thumb.png"})
            message.reply({embeds : [exampleEmbed]});
        })
        .on("searchCancel", message => message.reply(`${client.emotes.error} | Hủy phát nhạc do người dùng chưa chọn bài`))
        .on('searchInvalidAnswer', message => message.reply(`${client.emotes.error} | Tìm kiếm không hợp lệ`))
        .on('searchNoResult', message => message.reply(`${client.emotes.error} | Không có kết quả tìm kiếm`))
        .on("searchDone", () => {})

        .on('finish', queue => {
            queue.textChannel.send(`${client.emotes.success} | Đã phát xong`)
        })
        .on('finishSong', (queue, song) => {
            queue.textChannel.send(`${client.emotes.success} | Đã phát xong bài`)
            console.log(colors.blue(queue.id +` | Phát xong bài "${song.name}" | Còn ${(queue.song === undefined ? 1 : queue.song.length())-1} bài`));
        })
        .on('disconnect', queue => {
            queue.textChannel.send(`${client.emotes.success} | Đã thoát kênh`)
            console.log(colors.green(queue.id +` | Thoát kênh`));
        })
        .on('empty', (queue) => {
            queue.textChannel.send(`${client.emotes.queue} | Danh sách chờ đã Trống. Tự động thoát kênh sau 60s trống người`)
        })
        .on('deleteQueue', queue => {
            queue.textChannel.send(`${client.emotes.queue} | Đã xóa danh sách chờ`);
            console.log(colors.green(`${queue.id} | Xóa danh sách chờ`));
        })
        .on("noRelated", queue => queue.textChannel.send(`${client.emotes.error} | Không tìm thấy bài liên quan`));
    client.on("messageCreate", async (message) => {
        if(message.author.bot) return;
        if(message.channel.type === 'dm') return;
        if(message.content.startsWith(prefix)) {
            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();
            
            if(!client.commands.has(command)) return;

            try {
                client.commands.get(command).run(client, message, args);
                console.log(colors.yellow(`[Command] `) + `${message.author.tag} ${message.author} : ${message}`)
            } catch (error){ 
                console.error(error);
            }
        }
    });

    client.on("interactionCreate", async (interaction) => {
        if (interaction.isCommand() || interaction.isContextMenu()) {
            if (!interaction.guild) return;
            const command = client.slash.get(interaction.commandName);
            try {
                 //{ name: 'id', type: 'INTEGER', value: 69 }
                const option = [];
                const output = [];
                for (let opt of interaction.options.data) {
                    option.push(opt);
                    if (opt.type !== "SUB_COMMAND") {
                       output.push(opt.name + ":\"" + opt.value + "\"")
                    } else {
                        let string = `${opt.name} `
                        for (let dem = 0; dem < opt.options.length; dem++) {
                            string = string + opt.options[dem].name + `:"` + opt.options[dem].value + `" `
                        }
                        output.push(string)
                    }
                }
                interaction.member = interaction.guild.members.cache.get(interaction.user.id);
                command.run(client, interaction, option);
                console.log(colors.yellow(`[Slash]   `) + `${interaction.user.tag} ${interaction.user} : /${interaction.commandName} ${output.join(" ")}`)
            } catch (error) {
                console.error(colors.red(error))
                await interaction.reply({ content: "Đã xảy ra lỗi! Vui lòng thử lại.", ephemeral: true })
            }
        }
    })

    process.on('uncaughtException', function (err) {
        console.log(colors.red(err));
    });

    console.log(colors.bold(colors.cyan('Logging in...')));

    client.login(process.env.TOKEN).then((token) => {
        client.user.setPresence({
        status: 'online',
        });
    });
