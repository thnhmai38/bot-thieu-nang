const Discord = require('discord.js')

module.exports = {
    name: "skip",
    description: "skip track",
    inVoiceChannel: true,

    async run (client, message, args) {
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
        
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} | Bạn phải ở trong một kênh nói`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} | Bạn phải ở cùng kênh nói với Bot`); 

        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | Chả có gì đang phát cả`)
        try {
            if (queue.songs.length == 1) {
                queue.stop()
                message.channel.send(`${client.emotes.stop} | **Đã dừng**`)
            } else {
                const song = queue.skip()
                message.channel.send(`${client.emotes.success} | **Đã bỏ qua bài nhạc!**`)
            }
        } catch (e) {
            message.channel.send(`${client.emotes.error} | Lỗi : ${e}`)
        }
    }
}