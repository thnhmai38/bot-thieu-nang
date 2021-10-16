const Discord = require('discord.js')

module.exports = {
    name: "seek",
    description: "seek",
    inVoiceChannel: true,

    async run (client, message, args) {
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
        
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} | Bạn phải ở trong một kênh nói`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} | Bạn phải ở cùng kênh nói với Bot`); 

        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | Chả có gì đang phát cả!`);
        if (!args[0]) return message.channel.send(`${client.emotes.error} | Tua đến đâu?`)
        const time = Number(args[0])
        if (isNaN(time)) return message.channel.send(`${client.emotes.error} | Vui lòng nhập một số`)
        queue.seek(time)
        message.channel.send(`${client.emotes.success} | Dịch chuyển tới vị trí **${time}s**`)
    }
}