const Discord = require('discord.js')
const { ActionRowBuilder, ButtonBuilder, Client, CommandInteraction } = require("discord.js");
    
module.exports = {
    name: "previous",
    description: "Nghe bài đã phát trước đó",

    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
     async run (client, interaction, option) {

        if (!interaction.member.voice.channel) return interaction.reply({content: `${client.emotes.error} |  Bạn phải ở trong một kênh nói`, ephemeral: true});
        if (interaction.guild.members.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.members.me.voice.channel.id) return interaction.reply({content: `${client.emotes.error} |  Bạn phải ở cùng kênh nói với Bot`, ephemeral: true}); 

        const queue = client.distube.getQueue(interaction)
        if (!queue) return interaction.reply({content: `${client.emotes.error} | Chả có gì đang phát cả!`, ephemeral: true});
        try {
            queue.previous()
            interaction.reply(`${client.emotes.success} | Phát bài trước`)
        } catch (e) {
                interaction.reply({content: `${client.emotes.error} | Lỗi: **${e}**`, ephemeral: true})
                .catch(interaction.editReply({content: `${client.emotes.error} | Lỗi: **${e}**`, ephemeral: true}))
        }
    }
}