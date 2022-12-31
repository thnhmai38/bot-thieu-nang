const Discord = require('discord.js');
const { ActivityType, ChannelType } = require('discord.js')
const client = new Discord.Client({intents: ["Guilds", "GuildMessages", "GuildMessageReactions", "GuildVoiceStates", "MessageContent"]});
module.exports = client;
const fs = require('fs');
const { readdirSync } = require('fs');
const { join } = require('path')
require('log-timestamp')(function() { return "[" + new Date().toLocaleString(`en-GB`,  { timeZone: 'Asia/Ho_Chi_Minh' }) + "] "});
require("dotenv").config();
const colors = require("colors");
const DisTube = require("distube")
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { SpotifyPlugin } = require('@distube/spotify');
const { Routes } = require("discord-api-types/v9")
const { REST } = require("@discordjs/rest")
const { YtDlpPlugin } = require("@distube/yt-dlp");
var crypto = require('crypto-js');

    console.log(colors.bold(colors.cyan('Preparing and Running...')));

    const config = JSON.parse(fs.readFileSync("config.json"));
    const package = JSON.parse(fs.readFileSync("package.json"));

    const prefix = config.prefix; 
    client.emotes = config.emoji;
    const cmdFolder = config.source.command;
    const slsFolder = config.source.slash;

    client.commands = new Discord.Collection();
    client.slash = new Discord.Collection();

    const commandFiles = readdirSync(join(__dirname, cmdFolder)).filter(file => file.endsWith(".js"));
    
    const cmdcount = fs.readdirSync(cmdFolder).length;
    const slscount = fs.readdirSync(slsFolder).length;
    
    //?Text Command
    console.log(colors.bold(colors.yellow(`Starting load Commands...`)))
    var loaded = true; var count = 0;
    for (const file of commandFiles) {
        const command = require(join(__dirname, cmdFolder, `${file}`));
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

    //?Slash Command
    console.log(colors.bold(colors.yellow(`Starting load Slash Commands...`)))
    const slashFiles = readdirSync(join(__dirname, slsFolder)).filter(file => file.endsWith(".js"));
    const arrayOfSlashCommands = [];
    for (const file of slashFiles) {
        const command = require(join(__dirname, slsFolder, `${file}`));
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
        let i = 0, activities;
        activities = [`v${package.version}`,`/>help`,`/>invite`,`/>changelog`,`/>support`,`${client.guilds.cache.size} máy chủ`,`${client.channels.cache.size} kênh`,`${cmdcount} lệnh chữ`, `${slscount} lệnh gạch chéo`, `${client.users.cache.size} người dùng`]
        client.user.setActivity(`${activities[i ++ % activities.length]}`, {type: ActivityType.Listening})
        setInterval(() => {
            activities = [`v${package.version}`,`/>help`,`/>invite`,`/>changelog`,`/>support`,`${client.guilds.cache.size} máy chủ`,`${client.channels.cache.size} kênh`,`${cmdcount} lệnh chữ`, `${slscount} lệnh gạch chéo`, `${client.users.cache.size} người dùng`]
            client.user.setActivity(`${activities[i ++ % activities.length]}`, {type: ActivityType.Listening})
        }, 30000)
            
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
        nsfw: false,
        plugins: [new SoundCloudPlugin(), new YtDlpPlugin({ update: false }), new SpotifyPlugin()],
    })
    client.distube
        .on("error", (channel, error) => {
            console.log(colors.red(error));
            const exampleEmbed = new Discord.EmbedBuilder()
                .setColor('Red')
                .setAuthor({name: `${client.emotes.error} | Đã xảy ra lỗi`})
                .setDescription(`\n${error}\n\n\`Hãy thử lại một lần nữa hoặc đợi một lúc rồi thử lại! Nếu vấn đề vẫn chưa được khắc phục, liên hệ với chủ Bot bằng />support để được giúp đỡ\``)
                .setTimestamp()
            channel.send({embeds : [exampleEmbed]});
        })
        .on("addSong", (queue, song) => {
            const exampleEmbed = new Discord.EmbedBuilder()
                .setColor('#800080')
                .setAuthor({name: `${client.emotes.success} | Đã thêm bài nhạc`})
                .setTitle(`${song.name}`)
                .setURL(`${song.url}`)
                .setThumbnail(`${song.thumbnail}`)
                .addFields([
                    {name:'Lượt xem', value: `${new Intl.NumberFormat('en-US').format(song.views)}`, inline: true},
                    {name:'Lượt thích', value: `${new Intl.NumberFormat('en-US').format(song.likes)}`, inline: true},
                    {name:'Yêu cầu bởi', value: `${song.user}`, inline: true},
                    {name:'Người tải lên', value: `[${song.uploader.name}](${song.uploader.url})`, inline: true},
                    {name:'Thời lượng', value: `${song.isLive ? "LIVE" : song.formattedDuration}`, inline: true},
                    {name:'Âm lượng', value: `${queue.volume}%`, inline: true},
                    {name:'Lặp', value: `${queue.repeatMode ? queue.repeatMode === 2 ? "Tất cả" : "Đơn bài" : "Tắt"}`, inline: true},
                    {name:'Tự động phát', value: `${queue.autoplay ? "Bật" : "Tắt"}`, inline: true},
                    {name:'Filter', value: `\`${queue.filters.size === 0 ? "Tắt" : queue.filters.names.join(", ")}\``, inline: true},
                ])
                .setTimestamp()
            console.log(colors.yellow(queue.id +` | Thêm bài "${song.name}"/${song.url}`));
            queue.textChannel.send({embeds : [exampleEmbed]});
        })
        .on("playSong", (queue, song) => {
            const exampleEmbed = new Discord.EmbedBuilder()
                .setColor('Blue')
                .setAuthor({name: `${client.emotes.success} | Bắt đầu phát bài nhạc`})
                .setTitle(`${song.name}`)
                .setURL(`${song.url}`)
                .setThumbnail(`${song.thumbnail}`)
                .addFields([
                    {name: 'Lượt xem', value: `${new Intl.NumberFormat('en-US').format(song.views)}`, inline:true},
                    {name: 'Lượt thích', value: `${new Intl.NumberFormat('en-US').format(song.likes)}`, inline:true},
                    {name: 'Yêu cầu bởi', value: `${song.user}`, inline:true},
                    {name: 'Người tải lên', value: `[${song.uploader.name}](${song.uploader.url})`, inline:true},
                    {name: 'Thời lượng', value: `${song.isLive ? "LIVE" : song.formattedDuration}`, inline:true},
                    {name: 'Âm lượng', value: `${queue.volume}%`, inline:true},
                    {name: 'Lặp', value: `${queue.repeatMode ? queue.repeatMode === 2 ? "Tất cả" : "Đơn bài" : "Tắt"}`, inline:true},
                    {name: 'Tự động phát', value:`${queue.autoplay ? "Bật" : "Tắt"}`, inline:true},
                    {name: 'Filter', value:`\`${queue.filters.size === 0 ? "Tắt" : queue.filters.names.join(", ")}\``, inline:true},
                ])
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
            const exampleEmbed = new Discord.EmbedBuilder()
                .setColor('#800080')
                .setAuthor({name: `${client.emotes.success} | Đã thêm danh sách phát`})
                .setTitle(`${playlist.name}`)
                .setURL(`${playlist.url}`)
                .setThumbnail(`${playlist.thumbnail}`)
                .setDescription(`**Gồm các bài:** \n${song}\n`)
                .addFields([
                    {name: 'Tổng thời lượng', value:`${playlist.formattedDuration}`, inline: true},
                    {name: 'Yêu cầu bởi', value:`${playlist.user}`, inline: true},
                ])
                .setTimestamp()
            console.log(colors.yellow(queue.id +` | Thêm Playlist "${playlist.name}"/${playlist.url}`));
            queue.textChannel.send({embeds : [exampleEmbed]});
        })
        
        .on("searchResult", (message, results, query) => {
            let i = 0;
            const exampleEmbed = new Discord.EmbedBuilder()
                .setColor('Green')
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
            delete song.voteskip; //Thuyết Kiến tạo mảng
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
        if(message.channel.type === ChannelType.DM) return;
        if(message.content.startsWith(prefix)) {
            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();
            
            if(!client.commands.has(command)) return;

            try {
                if (command === "oantuti") client.commands.get(command).run(client, message, args); else {
                //! Phần chạy lệnh Command Bình thường: client.commands.get(command).run(client, message, args);
                    const movedEmbed = new Discord.EmbedBuilder()
                        .setColor('Red')
                        .setDescription(`**Lệnh \`${prefix}${command}\` đã được chuyển sang Slash Command.**\n**Vui lòng sử dụng \`/${command}\`**`)
                        .setTimestamp()
                    message.reply({embeds: [movedEmbed]});
                    console.log(colors.yellow(`[Command] ${message.author.id} : ` + crypto.AES.encrypt(message.content, process.env.keyEncrypt)))
                }    
            } catch (error) { 
                console.error(error);
                message.reply({content: "Đã xảy ra lỗi! Vui lòng thử lại"})
            }
        }
    });

    client.on("interactionCreate", async (interaction) => {
        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            if (!interaction.guild) return;
            const command = client.slash.get(interaction.commandName);
            try {
                 //?{ name: 'id', type: 'INTEGER', value: 69 }
                const option = [];
                const output = []; //option.value
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
                console.log(colors.white(`[Slash]   ${interaction.user.id} : ` + crypto.AES.encrypt(`/${interaction.commandName} ${JSON.stringify(option)}`, process.env.keyEncrypt)))
            } catch (error) {
                console.error(colors.red(error))
                await interaction.reply({ content: "Đã xảy ra lỗi! Vui lòng thử lại", ephemeral: true })
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
