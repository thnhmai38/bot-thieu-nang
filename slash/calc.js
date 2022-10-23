const Discord = require('discord.js');
const simplydjs = require('simply-djs')
const { ActionRowBuilder, ButtonBuilder, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "calc",
    description: "Máy tính tiểu học bỏ túi",
    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
    async run (client, interaction, option) {
        await interaction.deferReply();
    
    simplydjs.calculator(interaction, {
        embedColor: '#075FFF', //default: #075FFF
        credit: false,
        slash: true
    })
}
}