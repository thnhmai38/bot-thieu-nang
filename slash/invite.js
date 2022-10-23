const Discord = require('discord.js')
const { ActionRowBuilder, ButtonBuilder, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "invite",
    description: "Mời Bot tuyệt vời này vào máy chủ bạn",

    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
     async run (client, interaction, option) {
            
        const embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setTitle(`**BOT THIEU NANG**`)
            .setThumbnail('https://i.imgur.com/jUcU9ac.png')
            .setDescription(`Bot Thieu Nang - Một con Discord Bot với rất nhiều chức năng thú vị, như xem video YouTube, chơi game với bạn bè (có giao diện tương tác), nghe nhạc, quay ngẫu nhiên, nói thay hộ bạn, nói chuyện với SimSimi,... ngay tại Discord mà không phải đi bất cứ đâu!\n\n**TẤT CẢ ĐỀU MIỄN PHÍ 100%, KHÔNG BAO GIỜ DÙNG TIỀN ĐỂ DÙNG, MIỄN PHÍ MÃI MÃI!**
                
            **[MỜI BOT NGAY!](https://discord.com/oauth2/authorize?client_id=848103224854315018&permissions=412320525376&scope=applications.commands+bot)**
                
            - Server Support: *Dùng lệnh \`/>support\`*`)
            .setTimestamp()
            .setFooter({text: 'Một sản phẩm đầu tay của thanhgaming5550'});
        interaction.reply({embeds : [embed], ephemeral: true});
   }
}