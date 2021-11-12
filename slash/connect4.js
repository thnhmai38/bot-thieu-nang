const discord = require("discord.js");
const menu = require("../modules/menu.js")
const { MessageActionRow, MessageButton, Client, CommandInteraction } = require("discord.js");


module.exports = {
    name: "connect4",
    description: "Chơi Connect Four với một người",
    options: [
        {
            name: "user",
            type: 6,
            description: "Đối thủ muốn chơi cùng",
            required: true
        }],
    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
    async run (client, interaction, option) {
        const ConnectFour = new menu.ConnectFourSlash()
        ConnectFour.startGame(client, interaction, option)
    }
}