const Discord = require('discord.js')

module.exports = {
    name: "filter",
    description: "filter",


    async run (client, message, args) {
        

        if (!message.member.voice.channel) return message.reply(`${client.emotes.error} | Bạn phải ở trong một kênh nói`);
        if (message.guild.members.me.voice.channel && message.member.voice.channel.id !== message.guild.members.me.voice.channel.id) return message.reply(`${client.emotes.error} | Bạn phải ở cùng kênh nói với Bot`); 

        const queue = client.distube.getQueue(message)
        if (!queue) return message.reply(`${client.emotes.error} | Chả có gì đang phát cả!`);
        if (!args[0]) return message.reply(`${client.emotes.filter} Filter : **${queue.filters.size === 0 ? "`Tắt`" : "`" + queue.filters.names.join(", ") + "`"}**`)
        else if (args[0].toLowerCase() === "off") {
            queue.filters.clear();
            message.reply(`${client.emotes.filter} | **\`Tắt toàn bộ Filter\`** \n*Vui lòng đợi một lát để áp dụng thay đổi*`)
        }
        else if (Object.keys(client.distube.filters).includes(args[0].toLowerCase())) {
            const filter = (queue.filters.names.includes(args[0].toLowerCase()) ? queue.filters.remove(args[0].toLowerCase()) : queue.filters.add(args[0].toLowerCase()))
            let status; if (filter.names.includes(args[0].toLowerCase())) {status = "`Bật`"} else {status = "`Tắt`"} 
            message.reply(`${client.emotes.filter} | **${args[0].toLowerCase()}: ${status}** \n*Vui lòng đợi một lát để áp dụng thay đổi*`);
        }
        else if (args[0]) return message.reply(`${client.emotes.error} | Không có Filter này`)
    }
}