const Discord = require('discord.js')
const { MessageActionRow, MessageButton, Client, CommandInteraction } = require("discord.js");
module.exports = {
    name: "play",
    description: "Phát một bài hát",
    aliases: ["p"],
    inVoiceChannel: true,
    options: [
        {
            name: "query",
            type: 3,
            description: "Tên/Liên kết nhạc mà bạn muốn phát",
            required: true
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
        if (interaction.member.voice.channel.type == "GUILD_STAGE_VOICE" && interaction.member.voice.suppress == true) return interaction.reply({content: `${client.emotes.error} | Bạn đang ở trong kênh Sân khấu. Để dùng lệnh này trong kênh sân khấu, bạn phải **ở trên Sân khấu** (trở thành Người nói) trước`, ephemeral: true})

        try {
            client.distube.playVoiceChannel(interaction.member.voice.channel, option[0].value, {
                textChannel: interaction.channel,
                member: interaction.member
            })
            function loop(client, interaction) {
                if (interaction.member.voice.channel.type == "GUILD_STAGE_VOICE") {
                    setTimeout(function () {
                        if (client.distube.getQueue(interaction)) {
                            try {
                                interaction.reply({content: `${client.emotes.success}`+" | Đã nhận được lệnh phát nhạc!"});
                                interaction.guild.me.voice.setSuppressed(false)
                            } catch (e) {
                                interaction.guild.me.voice.setRequestToSpeak(true);
                                interaction.reply(`${client.emotes.success} | Đã gửi **Đề nghị Nói**. \n*Nếu Bot chưa xuất hiện trên Sân khấu, hãy mời Bot lên Sân khấu (trở thành Người nói) ngay để tránh việc nhạc phát khi Bot chưa lên Sân khấu*`)
                            };
                            return;
                        } else loop(client, interaction)
                    }, 2000)
                } else return interaction.reply({content: `${client.emotes.success}`+" | Đã nhận được lệnh phát nhạc!"});
            }
            loop(client, interaction);
        } catch (e) {
            interaction.reply({content: `${client.emotes.error} | Lỗi: **${e}**`, ephemeral: true})
        }
    }
}