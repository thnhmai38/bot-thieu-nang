const Discord = require('discord.js')

module.exports = {
    name: "filter",
    description: "filter",
    aliases: ["filters"],
    inVoiceChannel: true,

    async run (client, message, args) {
        

        if (!message.member.voice.channel) return message.reply(`${client.emotes.error} | Bạn phải ở trong một kênh nói`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`${client.emotes.error} | Bạn phải ở cùng kênh nói với Bot`); 

        const queue = client.distube.getQueue(message)
        if (!queue) return message.reply(`${client.emotes.error} | Chả có gì đang phát cả!`);
        if (!args[0]) return message.reply(`${client.emotes.filter} Filter : **${queue.filters.length === 0 ? "`Tắt`" : "`" + queue.filters.join(", ") + "`"}**`)
        else if (args[0].toLowerCase() === "off" && queue.filters?.length) {
            queue.setFilter(false)
            message.reply(`${client.emotes.filter} | **\`Tắt toàn bộ Filter\`** \n*Vui lòng đợi một lát để áp dụng thay đổi*`)
        }
        else if (Object.keys(client.distube.filters).includes(args[0].toLowerCase())) {
            const filter = queue.setFilter(args[0])
            let status;
            if (filter.includes(args[0])) {status = "`Bật`"} else {status = "`Tắt`"} 
            message.reply(`${client.emotes.filter} | **${args[0]}: ${status}** \n*Vui lòng đợi một lát để áp dụng thay đổi*`);
        }
        else if (args[0]) return message.reply(`${client.emotes.error} | Không rõ Filter`)
    }
}