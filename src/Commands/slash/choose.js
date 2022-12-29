const Discord = require('discord.js')
const { ActionRowBuilder, ButtonBuilder, Client, CommandInteraction } = require("discord.js");

module.exports = {
    
    name: "choose",
    description: "Lựa chọn ngẫu nhiên lựa chọn",
    options: [
        {
            name: "lc",
            type: 3,
            description: "Dãy các lựa chọn phân cách nhau bởi dấu cách",
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
        var args = option[0].value.split(" ");
        interaction.reply(args[Math.floor(Math.random() * args.length)])
    }
}
