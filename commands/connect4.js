const discord = require("discord.js");
const menu = require("../modules/menu.js")

module.exports = {
    name: "connect4",
    desciption: "chơi connect 4",

    async run(client, message, args) {
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
        const ConnectFour = new menu.ConnectFour()
        ConnectFour.startGame(message)
    }
}