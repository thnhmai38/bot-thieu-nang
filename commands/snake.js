const djsGames = require('djs-games')
const Discord = require("discord.js");

module.exports = {
    name: "snake",
    desciption: "Play snake",

    async run (client, message, args) {
    
    const SnakeGame = new djsGames.SnakeGame({
        message: message,
        buttons: true, // If you want to use buttons || False if you want to use reactions
        snake: '🟩',
        apple: '🍎',
        embedColor: 'Random',
        leftButton: '⬅️',
        rightButton: '➡️',
        upButton: '⬆️',
        downButton: '⬇️',
      })
    SnakeGame.start()
    }
}
