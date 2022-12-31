const figlet = require('figlet');
const colors = require("colors");
const Discord = require('discord.js')
const { ActionRowBuilder, ButtonBuilder, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "ascii",
    description: "Chuyển xâu sang xâu cấu tạo bởi các kí tự ASCII không có trong bảng chữ cái",
    options: [
        {
            name: "text",
            type: 3,
            description: "Xâu muốn chuyển",
            required: true
        }],
    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
     async run (client, interaction, option) {
        msg = option[0].value;

        figlet.text(msg, function (err, data) {
            if (err) {
                interaction.reply({content: "Đã xảy ra lỗi, xin vui lòng thử lại", ephemeral: true})
                console.error(err);
            }
            if(data.length > 2000) return interaction.reply({content: 'VUI LÒNG ĐIỀN NGẮN HƠN 2000 KÍ TỰ', ephemeral: true})

            interaction.reply('```' + data + '```')
        })
    }
}