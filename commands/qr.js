const Discord = require("discord.js")

module.exports = {
    name: "qr",
    description: "create qr code",
    async run (client, message, args){
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
        if (!args[0]) {return message.channel.send("Bạn định tạo QR gì vậy?")}
        const embed = new Discord.MessageEmbed()
           .setColor('RANDOM')
            .setTitle('Đã tạo xong mã QR')
            .setImage(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${args[0]}`)
            .setFooter(`Tạo bởi ${message.author.username}`)
            .setTimestamp()
        message.channel.send({embeds : [embed]});
    }
}