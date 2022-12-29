const Discord = require('discord.js')

module.exports = {
    name: "ping",
    description: "Test Ping to Bot",

    async run (client, message, args) {
        
        const ping = new Discord.EmbedBuilder()
        .setTitle('**🏓 PING PONG! 🏓**')
        .setColor("Random")
        .addFields(
            {
                name: "🏓 Bot Latency",
                value: `${Date.now() - interaction.createdTimestamp}ms`,
                inline: true,
            },
            {
                name: "☎️ API Latency",
                value: `${Math.round(client.ws.ping)}ms`,
                inline: true,
            }
        )
        .setTimestamp()   
        message.reply({embeds : [ping]});
    }
}