const Discord = require("discord.js");
const fetch = require('node-fetch')
const {
	MessageActionRow,
	MessageButton,
	Client,
	CommandInteraction,
} = require("discord.js");
function randomXToY(minVal,maxVal)
{
  var randVal = (minVal+(Math.random()*(maxVal-minVal))).toString();
  return Math.round(randVal);
}
const Imagetype = [`cuddle`, `dance`, `glomp`, `handhold`, `happy`, `highfive`, `kick`, `kill`, `lick`, `nom`, `pat`, `poke`, `neko`, `yeet`, `waifu`, `blush`, `bonk`, `hug`, `kiss`, `slap`, `smile`, `smug`, `wave`, `wink`, `awoo`, `bite`, `bully`, `cry`, "shinobu", "megumin", "cringe"]
const Hentaitype = [`trap`, `blowjob`, `waifu`, `neko`]
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
                            choices: [
                                {
                                    name: "Waifu",
                                    value: "waifu",
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
                                },
                                {
                                    name: "Shinobu (Nhân vật trong Bakemonogatari)",
                                    value: "shinobu"
                                },
                                {
                                    name: "Megumin (Nhân vật trong KonoSuba)",
                                    value: "megumin"
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
                                    value: "neko",
                                },
                                {
                                    name: "Yeet",
                                    value: "yeet",
                                },
                                {
                                    name: "Cringe (Khó chịu)",
                                    value: "cringe",
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
                            value: "neko",
                        },
                        {
                            name: "Waifu",
                            value: "waifu",
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
        let status;
        async function sendIMG(type, nsfw) {
            try {
                let status;
                var result = await fetch(`https://api.waifu.pics/${nsfw ? "nsfw" : "sfw"}/${type}`).then(res => {status = res.status; return res.json()})
                if (status !== 200) {
                    return interaction.editReply({content: `API hiện không phản hồi. Vui lòng thử lại sau.`, ephemeral: true})
                }
                result = JSON.parse(JSON.stringify(result))
                interaction.editReply({files:[result.url]}).then(msg => {msg.react("❤");});
            } 
            catch (e) {
                console.error(e);
                return interaction.editReply({content: 'Đã có lỗi xảy ra, vui lòng thử lại: `' + e.toString() + "`", ephemeral: true})
            }
        }
        function animeEmbed(data, pagination, type) {
            if (type === "search" && pagination.items.total == 0) { 
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
                let query;
                if (option[0].options[0].options.length === 0) query = Imagetype[randomXToY(1, Imagetype.length)-1]; else query = option[0].options[0].options[0].value;
                sendIMG(query, false);
            break;
            case "quote":
                
                var result = await fetch(`https://katanime.vercel.app/api/getrandom`).then(res => {status = res.status; return res.json()})
                if (status !== 200) {
                    return interaction.editReply({content: `API hiện không phản hồi. Vui lòng thử lại sau.`, ephemeral: true})
                }
                result = JSON.parse(JSON.stringify(result))
                const data = new Discord.EmbedBuilder()
                    .setDescription(`\`${result.result[0].english}\`\n`)
                    .addFields({name: `- ${result.result[0].character} -`, value: `*${result.result[0].anime}*`, inline: true})
                    .setColor("Random")
                interaction.editReply({embeds : [data], ephemeral: false})
                
            break;
            case "random":
                var result = await fetch(`https://api.jikan.moe/v4/random/anime`).then(res => {status = res.status; return res.json()})
                if (status !== 200) {
                    return interaction.editReply({content: `API hiện không phản hồi. Vui lòng thử lại sau.`, ephemeral: true})
                }
                result = JSON.parse(JSON.stringify(result));
                interaction.editReply({embeds:[animeEmbed(result.data)]});

            break;
            case "hentai":
                if (interaction.channel.nsfw) {
                    let query;
                    if (option[0].options.length === 0) query = Hentaitype[randomXToY(1, Hentaitype.length)-1]; else query = option[0].options[0].value;
                    sendIMG(query, true);
                } else {
                    interaction.editReply({content: `Bạn chỉ có thể sử dụng loại lệnh này ở kênh NSFW!`, ephemeral: true})
                }
            break;
            case "search":
                var result = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(option[0].options[0].value)}`).then(res => {status = res.status; return res.json()})
                if (status !== 200) {
                    return interaction.editReply({content: `API hiện không phản hồi. Vui lòng thử lại sau.`, ephemeral: true})
                }
                result = JSON.parse(JSON.stringify(result));
                interaction.editReply({content: `🔍 Tìm thấy **${result.pagination.items.total}** kết quả. ${result.pagination.items.total>1 ? "Hiển thị kết quả đầu tiên" : ""}`})
                interaction.editReply({embeds:[animeEmbed(result.data[0], result.pagination, "search")]});
            break;
            case "trace":
                var result = await fetch(`https://api.trace.moe/search?url=${encodeURIComponent(option[0].options[0].attachment.attachment)}`).then(res => {status = res.status; return res.json()})
                if (status !== 200) {
                    return interaction.editReply({content: `API hiện không phản hồi. Vui lòng thử lại sau.`, ephemeral: true})
                }
                result = JSON.parse(JSON.stringify(result));
                if (result.result.size === 0) {
                    const embed = new Discord.EmbedBuilder()
                        .setColor('Red')
                        .setTitle(`🔍 Không có kết quả!`)
                        .setDescription(`Không tìm thấy kết quả nào cho ảnh của bạn!`)
                        .setThumbnail(option[0].options[0].attachment.attachment)
                        .setTimestamp()
                    return embed;
                }
                const embed = new Discord.EmbedBuilder()
                    .setColor('Random')
                    .setTitle(result.result[0].filename)
                    .setAuthor({name: 'Đã tìm ra phân đoạn!'})
                    .setImage(result.result[0].image)
                    .setThumbnail(option[0].options[0].attachment.attachment)
                    .addFields(
                        { name: '🎞️ Tập', value: `${result.result[0].episode == null ? "*Không rõ*" : result.result[0].episode}`, inline: true},
                        { name: '🎬 Frame', value: `${result.result[0].from == null ? "*Không rõ*" : result.result[0].from} đến ${result.result[0].to == null ? "*Không rõ*" : result.result[0].to}`, inline: true},
                        { name: '📺 ID (AniList)', value: `${result.result[0].anilist == null ? "*Không rõ*" : `[${result.result[0].anilist}](https://anilist.co/anime/${result.result[0].anilist})`}`, inline: true}, 
                    )
                    .setTimestamp()
                    .setFooter({text: `Độ chính xác: ${(result.result[0].similarity*100).toFixed(2)}%`})
                interaction.editReply({content: `🔍 Có **${result.result.length}** kết quả. ${result.result.length>1 ? "Hiển thị kết quả đầu tiên chính xác nhất" : ""}`, embeds:[embed]});
                try {interaction.editReply({files: [result.result[0].video]})} catch {}
            break;
        }
	},
};
