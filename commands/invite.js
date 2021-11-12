const Discord = require('discord.js')

module.exports = {
    name: "invite",
    description: "Invite Bot",

    async run (client, message, args) {
            
        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`**-> NHẤN VÀO ĐÂY ĐỂ MỜI <-**`)
        .setThumbnail('https://i.imgur.com/falJ12t.jpg')
        .setDescription(`Bot Thieu Nang - Một con Discord Bot với rất nhiều chức năng thú vị, như xem video YouTube, chơi game với bạn bè (có giao diện tương tác), nghe nhạc, quay ngẫu nhiên, nói thay hộ bạn, nói chuyện với SimSimi,... ngay tại Discord mà không phải đi bất cứ đâu!\n\n**TẤT CẢ ĐỀU MIỄN PHÍ 100%, KHÔNG BAO GIỜ DÙNG TIỀN ĐỂ DÙNG, MIỄN PHÍ MÃI MÃI!**
            
        **[MỜI BOT NGAY!](https://discord.com/oauth2/authorize?client_id=848103224854315018&permissions=4294967287&scope=applications.commands%20bot)**
            
        *Lưu ý : Vì Bot có thể cập nhật thêm các lệnh mới với quyền hạn cần thiết mới cho nó, mình khuyến kích các bạn cung cấp đủ quyền hạn cho Bot để có thể sử dụng các chức năng mới và đặc biệt trong tương lai. Nếu không thích, hoặc cảm thấy sợ, mình không ép buộc các bạn, các bạn có thể bỏ tick những quyền hạn mà các bạn không thích nếu muốn ở trong phần mời Bot.*
            
        Contact/Liên hệ: [Contact 1](https://linktr.ee/thanhgaming5550) - [Contact 2](https://dsc.bio/thanhgaming5550)
        Server Support: *Dùng lệnh \`/>support\`* `)
        .setURL(`https://discord.com/oauth2/authorize?client_id=848103224854315018&permissions=4294967287&scope=applications.commands%20bot`)
        .setTimestamp()
	    .setFooter('Một sản phẩm đầu tay của thanhgaming5550');
        message.reply({embeds : [embed]});
   }
}