const Discord = require('discord.js')
const { Player, QueryType, QueueRepeatMode } = require("discord-player");
//const loopmode = ["OFF", "TRACK", "QUEUE", "AUTOPLAY"]
//const loopmodenumber = ["0","1","2","3"]

module.exports = {
    name: "loop",
    description: "loop",

    async run (client, message, args) {
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
        const player = client.player;
        if (!message.member.voice.channel) return message.channel.send("❌ | **Bạn phải ở trong một kênh nói!**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(":x: | **Bạn phải ở cùng kênh nói với Bot!**"); 

        const queue = player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.channel.send("❌ | Chả có gì đang phát cả!");

        const value = args[0].toUpperCase();
        var loopMode;
        
        //if (!loopmode.includes(value) || !loopmodenumber.includes(value)) return message.channel.send("❌ | Không rõ Mode lặp")
        if (value == "0" || value == "OFF") {loopMode = QueueRepeatMode.OFF}
        else if (value == "1" || value == "TRACK") {loopMode = QueueRepeatMode.TRACK}
        else if (value == "2" || value == "QUEUE") {loopMode = QueueRepeatMode.QUEUE}
        else if (value == "3" || value == "AUTOPLAY") {loopMode = QueueRepeatMode.AUTOPLAY}
        else return message.channel.send("❌ | Không rõ Mode lặp");
        const success = queue.setRepeatMode(loopMode);
        const mode = loopMode === QueueRepeatMode.TRACK ? "🔂" : loopMode === QueueRepeatMode.QUEUE ? "🔁" : loopMode === QueueRepeatMode.AUTOPLAY ? "⚙️": "▶";
        return message.channel.send(success ? `${mode} | Đã áp dụng Lặp!` : "❌ | Không thể áp dụng lặp!")
    }
}