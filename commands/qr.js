const Discord = require("discord.js")

module.exports = {
    name: "qr",
    description: "create qr code",
    async run (client, message, args){
        
        if (!args[0]) {return message.reply("Bạn định tạo QR gì vậy?")}
        const embed = new Discord.EmbedBuilder()
           .setColor('Random')
            .setTitle('Đã tạo xong mã QR')
            .setImage(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(args.join(" "))}`)
            .setFooter({text: `Tạo bởi ${message.author.tag}`})
            .setTimestamp()
        message.reply({embeds : [embed]});
    }
}