const fs = require('fs');
const Discord = require("discord.js")
const config = JSON.parse(fs.readFileSync("config.json"));

module.exports = {
    name: "invite",
    description: "Mời Bot vào máy chủ bạn",

    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
     async run (client, interaction, option) {
        interaction.reply({files: [`${config.source.assets}/invite.png`], ephemeral: true});
   }
}