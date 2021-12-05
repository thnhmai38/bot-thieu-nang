const Discord = require('discord.js')
const { MessageActionRow, MessageButton, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "loop",
    description: "Thiết đặt lặp nhạc",
    aliases: ["repeat", "rp"],
    inVoiceChannel: true,
    options: [
        {
            name: "mode",
            type: 3,
            description: "Chế độ lặp",
            required: true,
            choices: [
                {
                    name: "Tắt",
                    value: "1"
                },
                {
                    name: "Đơn bài",
                    value: "2"
                },
                {
                    name: "Tất cả",
                    value: "3"
                },
                {
                    name: "Hiển thị cách lặp hiện tại",
                    value: "4"
                },
            ]
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
        let mode = null
        switch (option[0].value) {
            case "1":
                mode = 0
                break
            case "2":
                mode = 1
                break
            case "3":
                mode = 2
                break
            case "4":
                mode = 4
                break
        }
        if (mode == 4) return interaction.reply(`${client.emotes.repeat} | Lặp: ${queue.repeatMode ? queue.repeatMode === 2 ? "Tất cả" : "Bài này" : "Tắt"}`)
        mode = queue.setRepeatMode(mode)
        mode = mode ? mode === 2 ? "Lặp toàn bộ" : "Lặp đơn bài" : "Tắt"
        interaction.reply(`${mode == "Lặp đơn bài" ? client.emotes.single : client.emotes.repeat} | Chỉnh chế độ lặp thành **${mode}**`)
    }
}