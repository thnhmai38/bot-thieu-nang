const Discord = require('discord.js')
const { Player, QueryType, QueueRepeatMode } = require("discord-player");

module.exports = {
    name: "volume",
    description: "config volume",

    async run (client, message, args) {
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
        const player = client.player;
        if (!message.member.voice.channel) return message.channel.send("❌ | **Bạn phải ở trong một kênh nói!**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(":x: | **Bạn phải ở cùng kênh nói với Bot!**"); 

        const queue = player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.channel.send("❌ | Chả có gì đang phát cả!");
        const vol = Number(args[0])
        if (!vol) return message.channel.send(`🎧 | Âm lượng hiện tại là **${queue.volume}%**!`);
        //if ((vol.value) < 0 || (vol.value) > 100) return message.channel.send("❌ | Bạn không thể chỉnh âm lượng không nằm trong khoảng 0-100");
        const success = queue.setVolume(vol);
        message.channel.send(success ? `✅ | Chỉnh âm lượng thành **${vol}%**!` : "❌ | Đã xảy ra lỗi!");
    }
}