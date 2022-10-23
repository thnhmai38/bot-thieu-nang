const DiscordJS = require('discord.js')
const ytsr = require('ytsr')

module.exports = {
    name : 'search',
    run : async(client, message, args) => {
        
        
        const author = message.author.id;
        const query = args.join(" ");
        if(!query) return message.reply("Bạn tìm gì à?");
    
        const res = await ytsr(query).catch(e => {
            return message.reply(`Không có kết quả tìm kiếm trên Youtube cho **${query}**`);
        });
    
        const video = res.items.filter(i => i.type == "video")[0];
        if (!video) return message.reply(`Không có kết quả tìm kiếm trên Youtube cho **${query}**`);
    
        const video1 = res.items.filter(i => i.type == "video")[1];
        const video2 = res.items.filter(i => i.type == "video")[2];
        const video3 = res.items.filter(i => i.type == "video")[3];
        const video4 = res.items.filter(i => i.type == "video")[4];
        const video5 = res.items.filter(i => i.type == "video")[5];
        const video6 = res.items.filter(i => i.type == "video")[6];
        const video7 = res.items.filter(i => i.type == "video")[7];
        const video8 = res.items.filter(i => i.type == "video")[8];
        const video9 = res.items.filter(i => i.type == "video")[9];
    
        var title = [video.title, video1.title, video2.title, video3.title, video4.title, video5.title, video6.title, video7.title, video8.title, video9.title]
        var link = [video.url, video1.url, video2.url, video3.url, video4.url, video5.url, video6.url, video7.url, video8.url, video9.url];
        var output = [];
        for (let i = 0; i < 10; i++) {
            output[i] = `${i+1}. [${title[i]}](${link[i]})`
        }
        var arr = output.join('\n');
        function youtube_parser(url){
            var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            var match = url.match(regExp);
            return (match&&match[7].length==11)? match[7] : false;
        }
        const embed = new DiscordJS.EmbedBuilder()
            .setColor('Random')
            .setDescription(`${arr}`)
            .setTitle(query)
            .setThumbnail(`https://img.youtube.com/vi/${youtube_parser(video.url)}/default.jpg`)
            .setFooter({text: `Tìm kiếm trên Youtube bởi ${message.author.tag}`, iconURL: "https://www.iconpacks.net/icons/2/free-youtube-logo-icon-2431-thumb.png"})
            .setTimestamp();

        message.reply({embeds : [embed]});
    }
}