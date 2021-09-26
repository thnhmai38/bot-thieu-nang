const fs = require('fs');
const { Pokemon } = require("../modules/menu.js")
require("dotenv").config();

module.exports = {
    name: "pokemon",
    desciption: "đoán pokemon",

    async run (client, message, args) {
    const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
    const game = new Pokemon({
        message: message,
        token: process.env.DAGPITOKEN, 
        })
        game.start()
    }
}
