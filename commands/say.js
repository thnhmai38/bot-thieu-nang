const { MessageFlags, MessageManager } = require("discord.js");

module.exports = {
    name: "say",
    desciption: "say command",

    async run (client, message, args) {
    
// />say vl Text
if (args[0] == 0) {
    if (!args[1]) {message.reply("Gửi cái gì cơ?")} else {
    if (message.channel.permissionsFor(message.author.id).has("MANAGE_MESSAGES")) {
        message.delete()
        const txt = args.slice(1).join(" ")
        message.channel.send(txt)
            .catch(message.reply('Bot không thể gửi tin nhắn vào kênh này.'))
    } else message.reply('Bạn không đủ thẩm quyền để thực hiện lệnh này');}
} else {
    if (args[0] == 1) {
    // />say vl Idc Text. Big Thanks to @allehS#3510
    if (!args[2]) {
        message.reply(`Vui lòng nhập đủ các giá trị!`)
    } else
    if (isNaN(Number(args[1]))) {
        message.reply("Vui lòng nhập đúng các giá trị!")
    } else {
        const channelId = args[1]
        const msgr = args.slice(2).join(" ");
        try {
            const channelneed = await client.channels.cache.get(channelId);
            if (channelneed.permissionsFor(message.author.id).has("MANAGE_MESSAGES")) {
                channelneed.send(msgr)
                    .then(message.reply(`**Đã gửi tin nhắn đến \`${channelneed.name}\`!**`))
                    .catch(message.reply('Bot không thể gửi tin nhắn vào kênh này. . Có thể là do Bot không có quyền hoặc không có mặt tại kênh này.'))
            } else message.reply('Bạn không đủ thẩm quyền để thực hiện lệnh này');
        } catch {message.reply("Bạn hoặc Bot không ở máy chủ đó hoặc Bot không thể truy cập kênh đó hoặc Bot không gửi được tin nhắn ở đó.")}
    }
} else message.reply("Nhập sai giá trị cấu hình")
} 
}
}
