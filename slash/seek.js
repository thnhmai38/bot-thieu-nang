const Discord = require('discord.js')
const { MessageActionRow, MessageButton, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "seek",
    description: "Tua nhạc đến vị trí nào đó trên bài nhạc",
    inVoiceChannel: true,
    options: [
        {
            name: "time",
            type: 4,
            description: "Vị trí bạn muốn phát (Tính bằng giây)",
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
        if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.reply({content: `${client.emotes.error} |  Bạn phải ở cùng kênh nói với Bot`, ephemeral: true}); 

        const queue = client.distube.getQueue(interaction)
        if (!queue) return interaction.reply({content: `${client.emotes.error} | Chả có gì đang phát cả!`, ephemeral: true});

        const time = Number(option[0].value)
        queue.seek(time)
        interaction.reply(`${client.emotes.success} | Dịch chuyển tới vị trí **${time}s**`)
    }
}