const Discord = require('discord.js')
const { ActionRowBuilder, ButtonBuilder, Client, CommandInteraction } = require("discord.js");
module.exports = {
    name: "stop",
    description: "Dừng phát nhạc",


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
        if (!queue) return interaction.reply({content: `${client.emotes.error} | Chả có gì đang phát cả`, ephemeral: true})
        const owner = queue.owner;
        function stop() {
            queue.stop();
            interaction.reply(`${client.emotes.stop} | Đã dừng nhạc!`)
        }
        if (interaction.user.id === owner.id || queue.voiceChannel.permissionsFor(interaction.user.id).has("MuteMembers") || queue.voiceChannel.permissionsFor(interaction.user.id).has("MoveMembers") || (queue.isAllowListEnabled && queue.allowList.includes(interaction.user.id))) {
            stop();
        } else {
            interaction.reply(`${client.emotes.error} | Bạn không có đủ quyền hạn để dừng nhạc`);
        }
    }
}