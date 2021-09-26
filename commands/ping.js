const Discord = require('discord.js')

module.exports = {
    name: "ping",
    description: "Test Ping to Bot",

    async run (client, message, args) {
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
        const ping = new Discord.MessageEmbed()
        .setTitle('**🏓 PING PONG! 🏓**')
        .setColor("RANDOM")
        .addFields(
            { name: 'Độ trễ của Bot', value: `${Date.now() - message.createdTimestamp}ms`, inline: true  },
            { name: 'Độ trễ của API', value: `${Math.round(client.ws.ping)}ms`, inline: true },
        )
        .setTimestamp()   
        message.channel.send({embeds : [ping]});
    }
}