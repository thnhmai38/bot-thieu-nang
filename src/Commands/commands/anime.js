const Discord = require("discord.js");
const fetch = require('node-fetch')
const {
	MessageActionRow,
	MessageButton,
	Client,
	Message,
} = require("discord.js");
function randomXToY(minVal,maxVal)
{
  var randVal = (minVal+(Math.random()*(maxVal-minVal))).toString();
  return Math.round(randVal);
}
const AnimeMode = ["image", "quote", "random", "hentai", "search", "trace"]
const Imagetype = [`cuddle`, `dance`, `glomp`, `handhold`, `happy`, `highfive`, `kick`, `kill`, `lick`, `nom`, `pat`, `poke`, `neko`, `yeet`, `waifu`, `blush`, `bonk`, `hug`, `kiss`, `slap`, `smile`, `smug`, `wave`, `wink`, `awoo`, `bite`, `bully`, `cry`]
const Hentaitype = [`trap`, `blowjob`, `waifu`, `neko`]
module.exports = {
	name: "anime",
	description: "Những lệnh liên quan đến anime",

	/**
	 *
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	async run(client, message, args) {
        if (!args[0]) return message.reply("`/>anime <tùy chọn>`\n*Vui lòng đọc Hướng dẫn để biết `<tùy chọn>` gồm gì*");
        args[0] = args[0].toLowerCase();
        if (!AnimeMode.includes(args[0])) return msg.edit("Tuỳ chọn không đúng. Vui lòng xem hướng dẫn");
        var msg = await message.reply("*Đang chờ API phản hồi...*");
        async function sendIMG(type) {
            try {
                var result = await fetch(`https://kyoko.rei.my.id/api/${type}.php`).then(res => res.json())
                result = JSON.parse(JSON.stringify(result))
                if (result.apiCode === 200) {
                    return msg.edit({content: "", files:[result.apiResult.url[0]]}).then(msg => {msg.react("❤");});
                } else {
                    return msg.edit({content: `API hiện không phản hồi. Vui lòng thử lại sau.`})
                }
            } 
            catch (e) {
                console.error(e);
                return msg.edit({content: 'Đã có lỗi xảy ra, vui lòng thử lại: `' + e.toString() + "`"})
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
        switch (args[0]) {
            case "image":
                if (args[1]) args[1] = args[1].toLowerCase();
                if (!args[1] || !Imagetype.includes(args[1])) args[1]=Imagetype[randomXToY(1, 28)-1];
                if (args[1]=="waifu") args[1]="sfw";
                if (args[1]=="neko") args[1]="sfwNeko";
                sendIMG(args[1]);
            break;
            case "quote":
                var result = await fetch(`https://kyoko.rei.my.id/api/quotes.php`).then(res => res.json())
                result = JSON.parse(JSON.stringify(result))
                if (result.apiCode === 200) {
                    const data = new Discord.EmbedBuilder()
                        .setDescription(`\`${result.apiResult[0].english}\`\n`)
                        .addFields({name: `- ${result.apiResult[0].character} -`, value: `*${result.apiResult[0].anime}*`, inline: true})
                        .setColor("Random")
                    msg.edit({content: "", embeds : [data]})
                } else {
                    msg.edit({content: `API hiện không phản hồi. Vui lòng thử lại sau.`})
                }
                
            break;
            case "random":
                var result = await fetch(`https://kyoko.rei.my.id/api/random.php`).then(res => res.json())
                result = JSON.parse(JSON.stringify(result));
                if (result.apiCode === 200) {
                    msg.edit({content: "", embeds:[animeEmbed(result.apiResult.url[0].data)]});
                } else {
                    msg.edit({content: `API hiện không phản hồi. Vui lòng thử lại sau.`})
                }

            break;
            case "hentai":
                if (message.channel.nsfw) {
                    if (args[1]) args[1] = args[1].toLowerCase();
                    if (!args[1] || !Hentaitype.includes(args[1])) args[1]=Hentaitype[randomXToY(1, 4)-1];
                    if (args[1]=="waifu") args[1]="nsfw";
                    if (args[1]=="neko") args[1]="nsfwNeko";
                    sendIMG(args[1]);
                } else {
                    msg.edit({content: `Bạn chỉ có thể sử dụng loại lệnh này ở kênh NSFW!`})
                }
            break;
            case "search":
                if (!args[1]) return msg.edit("Vui lòng nhập tên bộ phim bạn muốn tìm kiếm")
                var result = await fetch(`https://kyoko.rei.my.id/api/myanimelist.php?q=${encodeURIComponent(args.slice(1).join(" "))}`).then(res => res.json())
                result = JSON.parse(JSON.stringify(result));
                if (result.apiCode === 200) {
                    msg.edit({content:"", embeds:[animeEmbed(result.apiResult)]});
                } else {
                    msg.edit({content: `API hiện không phản hồi. Vui lòng thử lại sau.`})
                }
            break;
            case "trace":
                if (message.attachments.size===0) return msg.edit("Vui lòng đưa một ảnh bạn muốn tìm kiếm")
                let img = message.attachments.first().attachment;
                var result = await fetch(`https://kyoko.rei.my.id/api/trace.php?q=${encodeURIComponent(img)}`).then(res => res.json())
                result = JSON.parse(JSON.stringify(result));
                if (result.apiCode === 200) {
                    const embed = new Discord.EmbedBuilder()
                        .setColor('Random')
                        .setTitle(result.apiResult.filename)
                        .setAuthor({name: 'Đã tìm ra phân đoạn!'})
                        .setImage(result.apiResult.image)
                        .setThumbnail(img)
                        .addFields(
                            { name: '🎞️ Tập', value: `${result.apiResult.episode == null ? "*Không rõ*" : result.apiResult.episode}`, inline: true},
                            { name: '🎬 Frame', value: `${result.apiResult.from == null ? "*Không rõ*" : result.apiResult.from} đến ${result.apiResult.to == null ? "*Không rõ*" : result.apiResult.to}`, inline: true},
                            { name: '📺 ID (AniList)', value: `${result.apiResult.anilist == null ? "*Không rõ*" : `[${result.apiResult.anilist}](https://anilist.co/anime/${result.apiResult.anilist})`}`, inline: true}, 
                        )
                        .setTimestamp()
                        .setFooter({text: `Độ giống nhau: ${(result.apiResult.similarity*100).toFixed(2)}%`})
                    msg.edit({content: "", embeds:[embed]});
                    try {msg.edit({files: [result.apiResult.video]})} catch {}
                } else {
                    msg.edit({content: `API hiện không phản hồi. Vui lòng thử lại sau.`})
                }
            break;
        }
	},
};
