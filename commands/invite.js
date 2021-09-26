const Discord = require('discord.js')

module.exports = {
    name: "invite",
    description: "Invite Bot",

    async run (client, message, args) {
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)    
        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`**-> NHẤN VÀO ĐÂY ĐỂ MỜI <-**`)
        .setThumbnail('https://sm.pcmag.com/pcmag_me/review/m/microsoft-/microsoft-invite-for-iphone_juhj.jpg')
        .setDescription(`**Cảm ơn bạn đã quan tâm tới Bot thieu nang của mình!**

        Vì bot đang trong quá trình cập nhật thêm các lệnh mới, mình khuyến kích các bạn cung cấp đủ quyền hạn cho Bot để có thể sử dụng các chức năng mới và đặc biệt trong tương lai. Nếu không thích, hoặc cảm thấy sợ, mình không ép buộc các bạn, các bạn có thể bỏ tick những quyền hạn mà các bạn không thích nếu muốn ở trong phần mời Bot.

        Một lần nữa, mình, @thanhgaming5550#5550 xin cảm ơn bạn rất nhiều! Nếu có thắc mắc hay muốn báo cáo gì, hãy liên hệ cho mình để được giúp đỡ.
        [Liên hệ 1](https://linktr.ee/thanhgaming5550) | [Liên hệ 2](https://discords.com/bio/p/thanhgaming5550)`)
        .setURL(`https://discord.com/oauth2/authorize?client_id=848103224854315018&permissions=4294967287&scope=applications.commands%20bot`)
        .setTimestamp()
	    .setFooter('Một sản phẩm đầu tay của thanhgaming5550');
        message.channel.send({embeds : [embed]});
   }
}