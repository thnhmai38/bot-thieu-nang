const Discord = require('discord.js')
const { ActionRowBuilder, ButtonBuilder, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "volume",
    description: "Điều chỉnh âm lượng phát",
    aliases: ["v", "set-volume"],
    inVoiceChannel: true,
    options: [
        {
            name: "num",
            type: 4,
            description: "Số phần trăm của âm lượng",
            required: true,
        }
    ],

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
        
        const volume = parseInt(option[0].value)
        queue.setVolume(volume)
        interaction.reply(`${client.emotes.volume} | Chỉnh âm thanh thành **${volume}%**`)
    }
}