const Discord = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, Client, CommandInteraction } = require("discord.js");

module.exports = {
        name: "help",
        description: "Hướng dẫn dùng Bot",
        /**
        *
        * @param {Client} client
        * @param {CommandInteraction} interaction
        * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
        */
        async run (client, interaction, option) {
                const help = new Discord.EmbedBuilder()
                        .setTitle(`**-> NHẤN VÀO ĐỂ XEM HƯỚNG DẪN SỬ DỤNG <-**`)
                        .setDescription(`Hướng dẫn sử dụng Bot Thieu Nang`)
                        .setThumbnail('https://i.imgur.com/gfnBgbS.png')
                        .setURL(`https://bit.ly/btnguide`)
                        .setTimestamp()
                        .setColor("Random")
                interaction.reply({embeds : [help], ephemeral: true});
        }
} 