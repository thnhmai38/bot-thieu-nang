const Discord = require("discord.js");

module.exports = {
    name: "support",
    desciption: "support discord server",

    async run (client, message, args) {
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
        const help = new Discord.MessageEmbed()
            .setTitle(`**-> NHẤN VÀO ĐỂ THAM GIA MÁY CHỦ HỖ TRỢ <-**`)
            .setDescription(`Hỗ trợ sử dụng Bot Thieu Nang`)
            .setThumbnail('https://png.pngtree.com/element_our/png_detail/20190103/technical-support-png_309009.jpg')
            .setURL(`https://discord.gg/yUfA2km5Uj`)
            .setTimestamp()
            .setColor("RANDOM")
        message.channel.send({embeds : [help]});
    }
}
