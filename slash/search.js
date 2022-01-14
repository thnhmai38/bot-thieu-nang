const DiscordJS = require('discord.js')
const ytsr = require('ytsr')
const { MessageActionRow, MessageButton, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name : 'search',
    description: "Tìm kiếm Video trên YouTube",
    options: [
        {
            name: "text",
            type: 3,
            description: "Từ khóa tìm kiếm",
            required: true,
        }
    ],
    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
     async run (client, interaction, option) {
        const query = option[0].value;
        const start = new DiscordJS.MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`🔍 Đang tìm kiếm trên YouTube...`)
            .setTitle(query)
            .setFooter({name: `Tìm kiếm trên Youtube bởi ${interaction.user.tag}`, iconURL:"https://www.iconpacks.net/icons/2/free-youtube-logo-icon-2431-thumb.png"})
            .setTimestamp();
        interaction.reply({embeds : [start]});
        const res = await ytsr(query).catch(e => {
            return interaction.editReply(`Không có kết quả tìm kiếm trên Youtube cho **${query}**`);
        });
    
        const video = res.items.filter(i => i.type == "video")[0];
        if (!video) return interaction.editReply(`Không có kết quả tìm kiếm trên Youtube cho **${query}**`);
    
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
        const embed = new DiscordJS.MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`${arr}`)
            .setTitle(query)
            .setThumbnail(`https://img.youtube.com/vi/${youtube_parser(video.url)}/default.jpg`)
            .setFooter({text: `Tìm kiếm trên Youtube bởi ${interaction.user.tag}`, iconURL:"https://www.iconpacks.net/icons/2/free-youtube-logo-icon-2431-thumb.png"})
            .setTimestamp();

        interaction.editReply({embeds : [embed]});
    }
}