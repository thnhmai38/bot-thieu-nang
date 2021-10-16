const Discord = require('discord.js')

module.exports = {
    name: "loop",
    description: "loop",
    aliases: ["repeat", "rp"],
    inVoiceChannel: true,

    async run (client, message, args) {
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} | Bạn phải ở trong một kênh nói`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} | Bạn phải ở cùng kênh nói với Bot`); 

        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | Chả có gì đang phát cả`)
        let mode = null
        switch (args[0]) {
            case "off":
                mode = 0
                break
            case "song":
                mode = 1
                break
            case "queue":
                mode = 2
                break
            case "1":
                mode = 0
                break
            case "2":
                mode = 1
                break
            case "3":
                mode = 2
                break
            case "all":
                mode = 2
                break
        }
        mode = queue.setRepeatMode(mode)
        mode = mode ? mode === 2 ? "Lặp toàn bộ" : "Lặp một bài" : "Tắt"
        message.channel.send(`${client.emotes.repeat} | Chỉnh chế độ lặp thành **${mode}**`)
    }
}