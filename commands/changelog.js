const Discord = require('discord.js')

module.exports = {
    name: "changelog",
    description: "Bot Changelog",

    async run (client, message, args) {
        
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
	        .setTitle('**-> NHẤN VÀO ĐÂY ĐỂ XEM GHI CHÚ CẬP NHẬT <-**')
	        .setURL('https://botthieunang.blogspot.com/')
            .setDescription('Các ghi chú cập nhật kể từ ngày 13/07/2021 sẽ hiển thị ở blog trên')
            .setTimestamp()
        message.reply({embeds : [embed]});
    }
}