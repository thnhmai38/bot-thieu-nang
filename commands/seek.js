const Discord = require('discord.js')
const { Player, QueryType, QueueRepeatMode } = require("discord-player");
function isNaturalNumber(n) {
    n = n.toString(); // force the value incase it is not
    var n1 = Math.abs(n),
        n2 = parseInt(n, 10);
    return !isNaN(n1) && n2 === n1 && n1.toString() === n;
}
module.exports = {
    name: "seek",
    description: "seek",

    async run (client, message, args) {
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
        const player = client.player;
        if (!message.member.voice.channel) return message.channel.send("❌ | **Bạn phải ở trong một kênh nói!**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(":x: | **Bạn phải ở cùng kênh nói với Bot!**"); 
        if (!isNaturalNumber(args[0])) return message.channel.send("Vui lòng nhập đúng giá trị muốn tua đến (tính bằng giây)")
        const time = Number(args[0])*1000; 

        const queue = player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.channel.send("❌ | Chả có gì đang phát cả!");
        const seek = queue.seek(time)
        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        if (seek) {return message.channel.send({
            embeds: [
                {
                    title: `Bắt đầu phát nhạc ở giây thứ ${args[0]}`,
                    description: `🎶 | **${queue.current.title}**! (\`${perc.progress}%\`)`,
                    fields: [
                        {
                            name: "\u200b",
                            value: progress
                        }
                    ],
                    color: 0xffffff
                }
            ]
        })} else return message.channel.send("❌ | Đã xảy ra lỗi")
    }
}