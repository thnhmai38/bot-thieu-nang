const simplydjs = require('simply-djs')
const Discord = require('discord.js')
const { ActionRowBuilder, ButtonBuilder, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: 'tictactoe',
    description: 'Chơi TicTacToe',
    options: [{
        name: 'user',
        type: 6,
        description: 'Người bạn muốn chơi cùng',
        required: true,
      }],
    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
     async run (client, interaction, option) {
        await interaction.deferReply();
        simplydjs.tictactoe(interaction, {
            credit: false,
            xEmoji: '❌', //default: 
            oEmoji: '⭕', //default: ⭕
            idleEmoji: '➖', //default: ➖
            embedColor: '#075FFF', //default: #075FFF
            embedFoot: 'Chúc may mắn!',//default: 'Make sure to win ;)'.
            slash: true,
            userSlash: "user"
        })
    }
}