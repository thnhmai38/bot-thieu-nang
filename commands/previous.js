const Discord = require('discord.js')

module.exports = {
    name: "previous",
    description: "previous",
    inVoiceChannel: true,

    async run (client, message, args) {
        

        if (!message.member.voice.channel) return message.reply(`${client.emotes.error} | Bạn phải ở trong một kênh nói`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`${client.emotes.error} | Bạn phải ở cùng kênh nói với Bot`); 

        const queue = client.distube.getQueue(message)
        if (!queue) return message.reply(`${client.emotes.error} | Chả có gì đang phát cả!`);
        try {
            const song = queue.previous()
            message.reply(`${client.emotes.success} | Phát bài trước`)
        } catch (e) {
            message.reply(`${client.emotes.error} | Lỗi : **${e}**`)
        }
    }
}