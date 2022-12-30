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
const Imagetype = [`cuddle`, `dance`, `glomp`, `handhold`, `happy`, `highfive`, `kick`, `kill`, `lick`, `nom`, `pat`, `poke`, `neko`, `yeet`, `waifu`, `blush`, `bonk`, `hug`, `kiss`, `slap`, `smile`, `smug`, `wave`, `wink`, `awoo`, `bite`, `bully`, `cry`, "shinobu", "megumin", "cringe"]
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
        async function sendIMG(type, nsfw) {
            try {
                let status;
                var result = await fetch(`https://api.waifu.pics/${nsfw ? "nsfw" : "sfw"}/${type}`).then(res => {status = res.status; return res.json()})
                if (status !== 200) {
                    return msg.edit({content: `API hiện không phản hồi. Vui lòng thử lại sau.`})
                }
                result = JSON.parse(JSON.stringify(result))
                msg.edit({content: "", files:[result.url]}).then(msg => {msg.react("❤");});
            } 
            catch (e) {
                console.error(e);
                return msg.edit({content: 'Đã có lỗi xảy ra, vui lòng thử lại: `' + e.toString() + "`"})
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
        let status = 500;
        switch (args[0]) {
            case "image":
                if (args[1]) args[1] = args[1].toLowerCase();
                if (!args[1] || !Imagetype.includes(args[1])) args[1]=Imagetype[randomXToY(1, Imagetype.length)-1];
                sendIMG(args[1]);
            break;
            case "quote":
                var result = await fetch(`https://katanime.vercel.app/api/getrandom`).then(res => {status = res.status; return res.json()})
                if (status !== 200) {
                    return msg.edit({content: `API hiện không phản hồi. Vui lòng thử lại sau.`})
                }
                result = JSON.parse(JSON.stringify(result))
                const data = new Discord.EmbedBuilder()
                    .setDescription(`\`${result.result[0].english}\`\n`)
                    .addFields({name: `- ${result.result[0].character} -`, value: `*${result.result[0].anime}*`, inline: true})
                    .setColor("Random")
                msg.edit({content: "", embeds : [data]}) 
            break;
            case "random":
                var result = await fetch(`https://api.jikan.moe/v4/random/anime`).then(res => {status = res.status; return res.json()})
                if (status !== 200) {
                    return msg.edit({content: `API hiện không phản hồi. Vui lòng thử lại sau.`})
                }
                result = JSON.parse(JSON.stringify(result));
                msg.edit({content: "", embeds:[animeEmbed(result.data)]});
            break;
            case "hentai":
                if (message.channel.nsfw) {
                    if (args[1]) args[1] = args[1].toLowerCase();
                    if (!args[1] || !Hentaitype.includes(args[1])) args[1]=Hentaitype[randomXToY(1, Hentaitype.length)-1];
                    sendIMG(args[1]);
                } else {
                    msg.edit({content: `Bạn chỉ có thể sử dụng loại lệnh này ở kênh NSFW!`})
                }
            break;
            case "search":
                if (!args[1]) return msg.edit("Vui lòng nhập tên bộ phim bạn muốn tìm kiếm")
                var result = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(args.slice(1).join(" "))}`).then(res => {status = res.status; return res.json()})
                if (status !== 200) {
                    return msg.edit({content: `API hiện không phản hồi. Vui lòng thử lại sau.`})
                }
                result = JSON.parse(JSON.stringify(result));
                msg.edit({content: `🔍 Tìm thấy **${result.pagination.items.total}** kết quả. ${result.pagination.items.total>1 ? "Hiển thị kết quả đầu tiên" : ""}`})
                msg.edit({embeds:[animeEmbed(result.data[0], result.pagination, "search")]});
            break;
            case "trace":
                if (message.attachments.size===0) return msg.edit("Vui lòng đưa một ảnh bạn muốn tìm kiếm")
                let img = message.attachments.first().attachment;
                var result = await fetch(`https://api.trace.moe/search?url=${encodeURIComponent(img)}`).then(res => res.json())
                result = JSON.parse(JSON.stringify(result));
                if (result.result.size === 0) {
                    const embed = new Discord.EmbedBuilder()
                        .setColor('Red')
                        .setTitle(`🔍 Không có kết quả!`)
                        .setDescription(`Không tìm thấy kết quả nào cho ảnh của bạn!`)
                        .setThumbnail(img)
                        .setTimestamp()
                    return msg.edit({content: "", embeds: [embed]});
                }
                const embed = new Discord.EmbedBuilder()
                    .setColor('Random')
                    .setTitle(result.result[0].filename)
                    .setAuthor({name: 'Đã tìm thấy phân đoạn!'})
                    .setImage(result.result[0].image)
                    .setThumbnail(img)
                    .addFields(
                        { name: '🎞️ Tập', value: `${result.result[0].episode == null ? "*Không rõ*" : result.result[0].episode}`, inline: true},
                        { name: '🎬 Frame', value: `${result.result[0].from == null ? "*Không rõ*" : result.result[0].from} đến ${result.result[0].to == null ? "*Không rõ*" : result.result[0].to}`, inline: true},
                        { name: '📺 ID (AniList)', value: `${result.result[0].anilist == null ? "*Không rõ*" : `[${result.result[0].anilist}](https://anilist.co/anime/${result.result[0].anilist})`}`, inline: true}, 
                    )
                    .setTimestamp()
                    .setFooter({text: `Độ chính xác: ${(result.result[0].similarity*100).toFixed(2)}%`})
                msg.edit({content: `🔍 Có **${result.result.length}** kết quả. ${result.result.length>1 ? "Hiển thị kết quả đầu tiên chính xác nhất" : ""}`, embeds:[embed]});
                try {msg.edit({files: [result.result[0].video]})} catch {}
            break;
        }
	},
};
