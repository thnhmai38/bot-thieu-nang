const Discord = require('discord.js')

module.exports = {
    name: "loop",
    description: "loop",
    aliases: ["repeat", "rp"],
    inVoiceChannel: true,

    async run (client, message, args) {
        
        if (!message.member.voice.channel) return message.reply(`${client.emotes.error} | Bạn phải ở trong một kênh nói`);
        if (message.guild.members.me.voice.channel && message.member.voice.channel.id !== message.guild.members.me.voice.channel.id) return message.reply(`${client.emotes.error} | Bạn phải ở cùng kênh nói với Bot`); 

        const queue = client.distube.getQueue(message)
        if (!queue) return message.reply(`${client.emotes.error} | Chả có gì đang phát cả`)
        if (!args[0]) return message.reply(`${client.emotes.repeat} | Lặp: ${queue.repeatMode ? queue.repeatMode === 2 ? "Tất cả" : "Bài này" : "Tắt"}`)
        let mode = null
        switch (args[0].toLowerCase()) {
            case "off":
                mode = 0
                break
            case "song":
                mode = 1
                break
            case "single":
                mode = 1
                break    
            case "track":
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
            case "on":
                mode = 2
                break
        }
        mode = queue.setRepeatMode(mode)
        mode = mode ? mode === 2 ? "Lặp toàn bộ" : "Lặp đơn bài" : "Tắt"
        message.reply(`${mode == "Lặp đơn bài" ? client.emotes.single : client.emotes.repeat} | Chỉnh chế độ lặp thành **${mode}**`)
    }
}