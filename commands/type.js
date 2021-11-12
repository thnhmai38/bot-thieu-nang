const djsGames = require('djs-games')
const Discord = require("discord.js");

module.exports = {
    name: "type",
    desciption: "solo gõ nhanh",

    async run (client, message, args) {
    
    const FastTyper = new djsGames.FastTyper({
        message: message,
    })
    FastTyper.start();
    }
}
