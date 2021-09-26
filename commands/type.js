const djsGames = require('djs-games')
const Discord = require("discord.js");

module.exports = {
    name: "type",
    desciption: "solo gõ nhanh",

    async run (client, message, args) {
    const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
    const FastTyper = new djsGames.FastTyper()
    FastTyper.startGame(message)
    }
}
