const Discord = require("discord.js")
const { MessageActionRow, MessageButton, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "qr",
    description: "Tạo mã QR Code",
    options: [
        {
            name: "text",
            type: 3,
            description: "Thứ bạn nhận được từ mã QR sắp tạo",
            required: true,
        }],
    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
    async run (client, interaction, option) {
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Đã tạo xong mã QR')
            .setImage(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${option[0].value}`)
            .setFooter({text: `Tạo bởi ${interaction.user.tag}`})
            .setTimestamp()
        interaction.reply({embeds : [embed]});
    }
}