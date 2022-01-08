const { MessageFlags, MessageManager } = require("discord.js");

module.exports = {
    name: "say",
    desciption: "say command",

    async run (client, message, args) {
    
// />say vl Text
if (args[0] == 0) {
    if (!args[1]) {message.reply("Gửi cái gì cơ?")} else {
    if (message.member.permissions.has("MANAGE_MESSAGES")) {
        message.delete()
        const txt = args.slice(1).join(" ")
        message.channel.send(txt)
    } else message.reply('BẠN KHÔNG ĐỦ THẨM QUYỀN ĐỂ THỰC HIỆN LỆNH NÀY');}
} else {
    if (args[0] == 1) {
    // />say vl Idg Idc Text. Big Thanks to @allehS#3510
    if (!args[3]) {
        message.reply(`Vui lòng nhập đủ các giá trị!`)
    } else
    if (isNaN(Number(args[2])) || isNaN(Number(args[1]))) {
        message.reply("Vui lòng nhập đúng các giá trị!")
    } else {
        const guild = args[1]
        const channelId = args[2]
        const msgr = args.slice(3).join(" ");
        const userId = message.author.id
        try {
            const guild2 = await client.guilds.fetch(guild)
            const guild2Member = await guild2.members.fetch(userId)
            if (guild2Member.permissions.has("MANAGE_MESSAGES")) {
                client.channels.cache.get(channelId).send(msgr);
                message.reply("**DONE!**")
            } else message.reply('BẠN KHÔNG ĐỦ THẨM QUYỀN ĐỂ THỰC HIỆN LỆNH NÀY');
        } catch {message.reply("Bạn hoặc Bot không ở máy chủ đó hoặc Bot không thể truy cập kênh đó hoặc Bot không gửi được tin nhắn ở đó.")}
    }
} else message.reply("Nhập sai giá trị cấu hình")
} 
}
}
