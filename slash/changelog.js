const Discord = require('discord.js')
const { MessageActionRow, MessageButton, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "changelog",
    description: "Changelog của Bot",
    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
    async run (client, interaction, option) {
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
	        .setTitle('**-> NHẤN VÀO ĐÂY ĐỂ XEM GHI CHÚ CẬP NHẬT <-**')
	        .setURL('https://botthieunang.blogspot.com/')
            .setDescription('Các ghi chú cập nhật kể từ ngày 13/07/2021 sẽ hiển thị ở blog trên')
            .setTimestamp()
        interaction.reply({embeds : [embed], ephemeral: true});
    }
}