const Discord = require('discord.js')
const { MessageActionRow, MessageButton, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "queue",
    description: "Hiển thị Danh sách phát và Bài nhạc đang phát hiện tại",
    aliases: ["q"],
    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
     async run (client, interaction, option) {

        const queue = client.distube.getQueue(interaction)
        if (!queue) return interaction.reply({content: `${client.emotes.error} | Chả có gì đang phát cả!`, ephemeral: true});
        
        const q = queue.songs.map((song, i) => `${i === 0 ? "**Đang phát:" : `${i}.`} [${song.name}](${song.url}) - \`${i === 0 ? queue.formattedCurrentTime + " / " :""}${song.formattedDuration}\` ${i===0 ? "**" : ""}`).join("\n")
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('WHITE')
            .setTitle(`${client.emotes.queue} | Danh sách chờ`)
            .setDescription(`${q}`)
            .addField('Tổng thời gian', `${queue.formattedDuration}`, true)
            .addField('Âm lượng', `${queue.volume}%`, true)
            .addField('Lặp', `${queue.repeatMode ? queue.repeatMode === 2 ? "Tất cả" : "Đơn bài" : "Tắt"}`, true)
            .addField('Tự động phát', `${queue.autoplay ? "Bật" : "Tắt"}`, true)
            .addField('Filter', `\`${queue.filters.length === 0 ? "Tắt" : queue.filters.join(", ")}\``, true)
            .setTimestamp()
        interaction.reply({embeds : [exampleEmbed]});
    }
}