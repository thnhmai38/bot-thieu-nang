const Discord = require('discord.js')
const { MessageActionRow, MessageButton, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "skip",
    description: "Bỏ qua bài nhạc đang phát",
    inVoiceChannel: true,
    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
    async run (client, interaction, option) {
        
        if (!interaction.member.voice.channel) return interaction.reply({content: `${client.emotes.error} |  Bạn phải ở trong một kênh nói`, ephemeral: true});
        if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.reply({content: `${client.emotes.error} |  Bạn phải ở cùng kênh nói với Bot`, ephemeral: true}); 

        const queue = client.distube.getQueue(interaction)
        if (!queue) return interaction.reply({content: `${client.emotes.error} | Chả có gì đang phát cả`, ephemeral: true})
        try {
            if (queue.songs.length == 1) {
                queue.stop()
                interaction.reply(`${client.emotes.stop} | **Đã dừng**`)
            } else {
                queue.skip()
                interaction.reply(`${client.emotes.success} | **Đã bỏ qua bài nhạc!**`)
            }
        } catch (e) {
            interaction.reply({content: `${client.emotes.error} | Lỗi: ${e}`, ephemeral: true})
        }
    }
}