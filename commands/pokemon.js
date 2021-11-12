const fs = require('fs');
const { Pokemon } = require("../modules/menu.js")
require("dotenv").config();

module.exports = {
    name: "pokemon",
    desciption: "đoán pokemon",

    async run (client, message, args) {
    
        const game = new Pokemon({
            message: message,
            token: process.env.DAGPITOKEN, 
            })
        game.start()
    }
}
