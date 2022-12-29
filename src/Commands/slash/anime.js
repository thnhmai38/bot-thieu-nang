const Discord = require("discord.js");
const fetch = require('node-fetch')
const {
	MessageActionRow,
	MessageButton,
	Client,
	CommandInteraction,
} = require("discord.js");
const Imagetype = [`Cuddle`, `Dance`, `Glomp`, `Handhold`, `Happy`, `Highfive`, `Kick`, `Kill`, `Lick`, `Nom`, `Pat`, `Poke`, `Neko`, `Yeet`, `Waifu`, `Blush`, `Bonk`, `Hug`, `Kiss`, `Slap`, `Smile`, `Smug`, `Wave`, `Wink`, `Awoo`, `Bite`, `Bully`, `Cry`]
module.exports = {
	name: "anime",
	description: "Những lệnh liên quan đến anime",
	options: [
        { //?Image
            type: 2,
            name: "image",
            description: "Hình ảnh anime ngẫu nhiên",
            options: [
                { //?Trang 1
                    type: 1,
                    name: "page1", 
                    description: "Hình ảnh anime ngẫu nhiên (Trang 1)",
                    options: [
                        {
                            type: 3,
                            name: "type",
                            description: "Lựa chọn chọn ảnh",
                            required: true,
                            choices: [
                                {
                                    name: "Waifu",
                                    value: "sfw",
                                },
                                {
                                    name: "Blush (Xấu hổ)",
                                    value: "blush",
                                },
                                {
                                    name: "Bonk",
                                    value: "bonk",
                                },
                                {
                                    name: "Hug (Ôm chặt)",
                                    value: "hug",
                                },
                                {
                                    name: "Kiss (Hôn)",
                                    value: "kiss",
                                },
                                {
                                    name: "Slap (Tát)",
                                    value: "slap",
                                },
                                {
                                    name: "Smile (Cười)",
                                    value: "smile",
                                },
                                {
                                    name: "Smug (Tự mãn)",
                                    value: "smug",
                                },
                                {
                                    name: "Wave",
                                    value: "wave",
                                },
                                {
                                    name: "Wink (Nháy mắt)",
                                    value: "wink",
                                },
                                {
                                    name: "Awoo",
                                    value: "awoo",
                                },
                                {
                                    name: "Bite (Cắn)",
                                    value: "bite",
                                },
                                {
                                    name: "Bully (Bắt nạt)",
                                    value: "bully",
                                },
                                {
                                    name: "Cry (Khóc)",
                                    value: "cry",
                                }
                            ],
                        }
                    ]
                },
                { //?Trang 2
                    type: 1,
                    name: "page2", 
                    description: "Hình ảnh anime ngẫu nhiên (Trang 2)",
                    options: [
                        {
                            type: 3,
                            name: "type",
                            description: "Lựa chọn chọn ảnh",
                            required: true, 
                            choices: [
                                {
                                    name: "Cuddle (Ôm yêu mến)",
                                    value: "cuddle",
                                },
                                {
                                    name: "Dance (Nhảy)",
                                    value: "dance",
                                },
                                {
                                    name: "Glomp (Uể oải)",
                                    value: "glomp",
                                },
                                {
                                    name: "Handhold (Nắm tay)",
                                    value: "handhold",
                                },
                                {
                                    name: "Happy (Vui)",
                                    value: "happy",
                                },
                                {
                                    name: "Highfive (Đập tay)",
                                    value: "highfive",
                                },
                                {
                                    name: "Kick (Đá)",
                                    value: "kick",
                                },
                                {
                                    name: "Kill (Giết)",
                                    value: "kill",
                                },
                                {
                                    name: "Lick (Liếm)",
                                    value: "lick",
                                },
                                {
                                    name: "Nom",
                                    value: "nom",
                                },
                                {
                                    name: "Pat (Vỗ)",
                                    value: "pat",
                                },
                                {
                                    name: "Poke (Chạm)",
                                    value: "poke",
                                },
                                {
                                    name: "Neko (Cosplay Mèo)",
                                    value: "sfwNeko",
                                },
                                {
                                    name: "Yeet",
                                    value: "yeet",
                                },
                            ]
                        }
                    ]
                }
            ]
        },
        { //?Quote
            type: 1,
			name: "quote",
			description: "Câu nói của một nhân vật Anime ngẫu nhiên",
        },
        { //?Random
			type: 1,
            name: "random",
			description: "Bộ anime ngẫu nhiên",
        },
        { //?Hentai
            type: 1,
			name: "hentai",
			description: "Hình ảnh anime nhạy cảm ngẫu nhiên [NSFW]",
            options: [
                {
                    type: 3,
                    name: "type",
                    description: "Lựa chọn của bạn",
                    required: false,
                    choices: [
                        {
                            name: "Trap",
                            value: "trap",
                        },
                        {
                            name: "Blowjob",
                            value: "blowjob",
                        },
                        {
                            name: "Neko",
                            value: "nsfwNeko",
                        },
                        {
                            name: "Waifu",
                            value: "nsfw",
                        },
                    ]
                }
            ]
        },
        { //?Search
            type: 1,
            name: "search",
            description: "Tra cứu bộ Anime",
            options: [
                {
                    type: 3,
                    name: "name",
                    description: "Tên bộ Anime",
                    required: true
                }
            ] 
        },
        { //?Trace
            type: 1,
            name: "trace",
            description: "Tìm anime từ một phân cảnh trong phim",
            options: [
                {
                    type: 11,
                    name: "image",
                    description: "Hình ảnh",
                    required: true
                }
            ] 
        }
	],

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
	 */
	async run(client, interaction, option) {
		await interaction.deferReply();
        async function sendIMG(type) {
            try {
                var result = await fetch(`https://kyoko.rei.my.id/api/${type}.php`).then(res => res.json())
                result = JSON.parse(JSON.stringify(result))
                if (result.apiCode === 200) {
                    interaction.editReply({files:[result.apiResult.url[0]]}).then(msg => {msg.react("❤");});
                } else {
                    interaction.editReply({content: `API hiện không phản hồi. Vui lòng thử lại sau.`, ephemeral: true})
                }
            } 
            catch (e) {
                console.error(e);
                return interaction.editReply({content: 'Đã có lỗi xảy ra, vui lòng thử lại: `' + e.toString() + "`", ephemeral: true})
            }
        }
        function animeEmbed(data) {
            if (Array.isArray(data)) {
            const embed = new Discord.EmbedBuilder()
                .setColor('Red')
                .setTitle(`🔍 Không tìm thấy!`)
                .setDescription(`Thử cụ thể hơn và kiểm tra chính tả cho tên phim bạn vừa nhập!`)
                .setTimestamp()
            return embed;
            }
            let header =`\n**Tên Tiếng Anh:** ${data.title_english == null ? "*Không có*" : "`" + data.title_english + "`"}
            **Tên Tiếng Nhật:** ${data.title_japanese == null ? "*Không có" : "`"+ data.title_japanese+ "`"}
            
            **Chuyển thể từ:** ${data.source == null ? "*Không rõ" : data.source}
            **Thời lượng mỗi tập:** ${data.duration == null ? "*Không rõ*" : data.duration}
            **Xếp hạng:** ${(data.rank == null || data.rank == 0) ? "*Không rõ*" : "#"+data.rank}
            **Hạng nổi tiếng:** ${(data.rank == null || data.rank == 0) ? "*Không rõ*" : "#"+data.rank}
            **Anime mùa:** ${data.season == null ? "*Không rõ*" : data.season}`
            let tt = `\n**Tóm tắt:**\n ${data.synopsis == null ? "*Không có*" : "`"+data.synopsis+"`"}\n`
            let mota = header + tt;
            const embed = new Discord.EmbedBuilder()
                .setColor('Random')
                .setTitle(data.title)
                .setURL(data.url)
                .setAuthor({name: `ID Phim: ${data.mal_id} (MyAnimeList)`})
                .setDescription(mota.length>4000 ? header : mota)
                .addFields(
                    { name: '🎬 Trailer', value: `${data.trailer.url == null ? "*Không có*" : `[Xem](${data.trailer.url})`}`, inline: true},
                    { name: '📺 Loại phim', value: `${data.type == null ? "*Không rõ*" : data.type}`, inline: true},
                    { name: '🎞️ Số tập', value: `${data.episodes == null ? "*Không rõ*" : data.episodes}`, inline: true},
                    { name: '⭐ Điểm', value: `${data.score == null ? "*Không rõ*" : data.score}`, inline: true},
                    { name: '🎯 Độ phù hợp', value: `${data.rating == null ? "*Không rõ*" : data.rating}`, inline: true},
                    { name: '🎥 Năm sản xuất', value: `${data.year == null ? "*Không rõ*" : data.year}`, inline: true},
                )
                .setImage(data.images.webp.large_image_url)
                .setThumbnail(data.images.webp.small_image_url)
                .setTimestamp()
                .setFooter({text: `Trạng thái: ${data.status == null ? "Không rõ" : data.status} `})
            return embed;
        }
        switch (option[0].name) {
            case "image":
                sendIMG(option[0].options[0].options[0].value);
            break;
            case "quote":
                var result = await fetch(`https://kyoko.rei.my.id/api/quotes.php`).then(res => res.json())
                result = JSON.parse(JSON.stringify(result))
                if (result.apiCode === 200) {
                    const data = new Discord.EmbedBuilder()
                        .setDescription(`\`${result.apiResult[0].english}\`\n`)
                        .addFields({name: `- ${result.apiResult[0].character} -`, value: `*${result.apiResult[0].anime}*`, inline: true})
                        .setColor("Random")
                    interaction.editReply({embeds : [data], ephemeral: false})
                } else {
                    interaction.editReply({content: `API hiện không phản hồi. Vui lòng thử lại sau.`, ephemeral: true})
                }
                
            break;
            case "random":
                var result = await fetch(`https://kyoko.rei.my.id/api/random.php`).then(res => res.json())
                result = JSON.parse(JSON.stringify(result));
                if (result.apiCode === 200) {
                    interaction.editReply({embeds:[animeEmbed(result.apiResult.url[0].data)]});
                } else {
                    interaction.editReply({content: `API hiện không phản hồi. Vui lòng thử lại sau.`, ephemeral: true})
                }

            break;
            case "hentai":
                if (interaction.channel.nsfw) sendIMG(option[0].options[0].value); else {
                    interaction.editReply({content: `Bạn chỉ có thể sử dụng loại lệnh này ở kênh NSFW!`, ephemeral: true})
                }
            break;
            case "search":
                var result = await fetch(`https://kyoko.rei.my.id/api/myanimelist.php?q=${encodeURIComponent(option[0].options[0].value)}`).then(res => res.json())
                result = JSON.parse(JSON.stringify(result));
                if (result.apiCode === 200) {
                    interaction.editReply({embeds:[animeEmbed(result.apiResult)]});
                } else {
                    interaction.editReply({content: `API hiện không phản hồi. Vui lòng thử lại sau.`, ephemeral: true})
                }
            break;
            case "trace":
                var result = await fetch(`https://kyoko.rei.my.id/api/trace.php?q=${encodeURIComponent(option[0].options[0].attachment.attachment)}`).then(res => res.json())
                result = JSON.parse(JSON.stringify(result));
                if (result.apiCode === 200) {
                    const embed = new Discord.EmbedBuilder()
                        .setColor('Random')
                        .setTitle(result.apiResult.filename)
                        .setAuthor({name: 'Đã tìm ra phân đoạn!'})
                        .setImage(result.apiResult.image)
                        .setThumbnail(option[0].options[0].attachment.attachment)
                        .addFields(
                            { name: '🎞️ Tập', value: `${result.apiResult.episode == null ? "*Không rõ*" : result.apiResult.episode}`, inline: true},
                            { name: '🎬 Frame', value: `${result.apiResult.from == null ? "*Không rõ*" : result.apiResult.from} đến ${result.apiResult.to == null ? "*Không rõ*" : result.apiResult.to}`, inline: true},
                            { name: '📺 ID (AniList)', value: `${result.apiResult.anilist == null ? "*Không rõ*" : `[${result.apiResult.anilist}](https://anilist.co/anime/${result.apiResult.anilist})`}`, inline: true}, 
                        )
                        .setTimestamp()
                        .setFooter({text: `Độ giống nhau: ${(result.apiResult.similarity*100).toFixed(2)}%`})
                    interaction.editReply({embeds:[embed]});
                    try {interaction.editReply({files: [result.apiResult.video]})} catch {}
                } else {
                    interaction.editReply({content: `API hiện không phản hồi. Vui lòng thử lại sau.`, ephemeral: true})
                }
            break;
        }
	},
};
