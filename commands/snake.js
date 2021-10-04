const djsGames = require('djs-games')
const Discord = require("discord.js");

module.exports = {
    name: "snake",
    desciption: "Play snake",

    async run (client, message, args) {
    const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
    const SnakeGame = new djsGames.SnakeGame({
        message: message,
        buttons: true, // If you want to use buttons || False if you want to use reactions
        snake: '🟩',
        apple: '🍎',
        embedColor: 'RANDOM',
        leftButton: '⬅️',
        rightButton: '➡️',
        upButton: '⬆️',
        downButton: '⬇️',
      })
    SnakeGame.start()
    }
}
