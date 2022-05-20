const Discord = require('discord.js')

module.exports = {
    name: "invite",
    description: "Invite Bot",

    async run (client, message, args) {
            
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`**BOT THIEU NANG**`)
            .setThumbnail('https://i.imgur.com/jUcU9ac.png')
            .setDescription(`Bot Thieu Nang - Một con Discord Bot với rất nhiều chức năng thú vị, như xem video YouTube, chơi game với bạn bè (có giao diện tương tác), nghe nhạc, quay ngẫu nhiên, nói thay hộ bạn, nói chuyện với SimSimi,... ngay tại Discord mà không phải đi bất cứ đâu!\n\n**TẤT CẢ ĐỀU MIỄN PHÍ 100%, KHÔNG BAO GIỜ DÙNG TIỀN ĐỂ DÙNG, MIỄN PHÍ MÃI MÃI!**
                
            **[MỜI BOT NGAY!](https://discord.com/oauth2/authorize?client_id=848103224854315018&permissions=412320525376&scope=applications.commands+bot)**
                
            - Server Support: *Dùng lệnh \`/>support\`*`)
            .setTimestamp()
            .setFooter({text: 'Một sản phẩm đầu tay của thanhgaming5550'});
        message.reply({embeds : [embed]});
   }
}