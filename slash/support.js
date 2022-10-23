const Discord = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "support",
    description: "Máy chủ hỗ trợ Discord của Bot",

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
     */
    async run (client, interaction, option) {
        const help = new Discord.EmbedBuilder()
            .setTitle(`**-> NHẤN VÀO ĐỂ THAM GIA MÁY CHỦ HỖ TRỢ <-**`)
            .setDescription(`Hỗ trợ sử dụng Bot Thieu Nang`)
            .setThumbnail('https://png.pngtree.com/element_our/png_detail/20190103/technical-support-png_309009.jpg')
            .setURL(`https://discord.gg/yUfA2km5Uj`)
            .setTimestamp()
            .setColor("Random")
        interaction.reply({embeds : [help], ephemeral: true});
    }
}
