const Discord = require('discord.js')
const { Player, QueryType, QueueRepeatMode } = require("discord-player");

module.exports = {
    name: "resume",
    description: "resume",

    async run (client, message, args) {
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
        const player = client.player;
        if (!message.member.voice.channel) return message.channel.send("❌ | **Bạn phải ở trong một kênh nói!**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(":x: | **Bạn phải ở cùng kênh nói với Bot!**"); 

        const queue = player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.channel.send("❌ | Chả có gì đang phát cả!");
        const success = queue.setPaused(false);
        return message.channel.send(success ? "▶ | Tiếp tục phát!" : "❌ | Đã xảy ra lỗi!" );
    }
}