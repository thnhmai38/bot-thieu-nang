const Discord = require('discord.js')
const { MessageActionRow, MessageButton, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "queue",
    description: "Hiển thị Danh sách phát và Bài nhạc đang phát hiện tại",
    aliases: ["q", "np"],
    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
     async run (client, interaction, option) {

        const queue = client.distube.getQueue(interaction)
        if (!queue) return interaction.reply({content: `${client.emotes.error} | Chả có gì đang phát cả!`, ephemeral: true});
        
        const q = queue.songs.map((song, i) => `${i === 0 ? "**Đang phát:" : `${i}.`} [${song.name}](${song.url}) - \`${song.formattedDuration}\` ${i===0 ? "**" : ""}`).join("\n")
        const status = queue => `Âm lượng: ${queue.volume}% | Bộ lọc: ${queue.filters.length === 0 ? "Tắt" : queue.filters} | Lặp: ${queue.repeatMode ? queue.repeatMode === 2 ? "Tất cả" : "Bài này" : "Tắt"} | Tự động phát: ${queue.autoplay ? "Bật" : "Tắt"}`
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('WHITE')
            .setTitle(`${client.emotes.queue} | Danh sách chờ`)
            .setDescription(`${q}\n\n *Tổng thời gian : ${queue.formattedDuration}*`)
            .setTimestamp()
            .setFooter(status(queue), `https://i.imgur.com/hfTBpOg.gif`);
        interaction.reply({embeds : [exampleEmbed]});
    }
}