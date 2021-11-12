const fs = require('fs');
const { PokemonSlash } = require("../modules/menu.js")
require("dotenv").config();
const Discord = require('discord.js')
const { MessageActionRow, MessageButton, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "pokemon",
    description: "Đoán pokemon",
    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
    async run (client, interaction, option) {
    
        const game = new PokemonSlash({
            interaction: interaction,
            token: process.env.DAGPITOKEN, 
            })
        game.start()
    }
}
