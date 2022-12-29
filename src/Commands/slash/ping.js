const Discord = require('discord.js')

module.exports = {
    name: "ping",
    description: "Kiểm tra Ping",

    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    async run (client, interaction, args) {
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
        interaction.reply({embeds : [ping], ephemeral: true});
    }
}