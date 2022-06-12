const Discord = require('discord.js')
const { MessageActionRow, MessageButton, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "queue",
    description: "Hiển thị Danh sách phát và các thông tin liên quan đến hàng chờ và bài nhạc hiện tại",
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
        
        const q = queue.songs.map((song, i) => `${i === 0 ? "**Đang phát:" : `${i}.`} [${song.name}](${song.url}) (${song.member}) ${song.age_restricted==true?`(*) `:''}- \`${i === 0 ? queue.formattedCurrentTime + " / " :""}${song.formattedDuration}\` ${i===0 ? "**" : ""}`).join("\n")
        const allowList = queue.allowList.length==0 ? `*Không ai*` : queue.allowList.map((value) => `<@${value}>`).join(", ");
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('WHITE')
            .setTitle(`${client.emotes.queue} | Danh sách chờ`)
            .setDescription(`${q}`)
            .addField('Tổng thời gian', `${queue.formattedDuration}`, true)
            .addField('Âm lượng', `${queue.volume}%`, true)
            .addField('Filter', `\`${queue.filters.length === 0 ? "Tắt" : queue.filters.join(", ")}\``, true)
            .addField('Tự động phát', `${queue.autoplay ? "Bật" : "Tắt"}`, true)
            .addField('Lặp', `${queue.repeatMode ? queue.repeatMode === 2 ? "Tất cả" : "Đơn bài" : "Tắt"}`, true)
            .addField('Chủ Hàng đợi', `${queue.owner}`, true)
            .addField('Danh sách Cho phép', allowList, true)
            .setThumbnail(queue.songs[0].thumbnail)
            .setFooter({
                text: `(*) là Nội dung Giới hạn độ tuổi`
            })
            .setTimestamp()
        interaction.reply({embeds : [exampleEmbed]});
    }
}