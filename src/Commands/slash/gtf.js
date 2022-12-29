const Discord = require("discord.js")
const fs = require('fs');
const fetch = require("node-fetch")
require("dotenv").config();
const { ActionRowBuilder, ButtonBuilder, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "gtf",
    description: "Đoán cờ đất nước",
    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
    async run (client, interaction, option) {
        
        const dagpiToken = process.env.DAGPITOKEN;
        const token = dagpiToken;
        const winFooter = "BẠN ĐÃ THẮNG!";
        const winColor = "Green"
        const lostColor = "Red";
        const lostFooter = "BẠN ĐÃ THUA!";
        const questionColor = "Blue";
        const stopCommand = "stop"
        const questionFooter = `ĐÂY LÀ NƯỚC NÀO? Nhập ${stopCommand} để dừng chơi`;

        fetch(`https://api.dagpi.xyz/data/flag`, {
                headers: {
                    "Authorization": token
                }
            })
            .then(res => res.json())
            .then(data => {

                const que = new Discord.EmbedBuilder()
                    .setTitle(`ĐOÁN CỜ!`)
                    .addFields([{name: `Thủ đô: `, value: `${data.Data.capital}`}])
                    .setColor(questionColor || "Random")
                    .setImage(data.flag)
                    .setFooter({text: questionFooter})
                    .setTimestamp()


                const right = new Discord.EmbedBuilder()
                    .setTitle(`Bạn đã đoán đúng!`)
                    .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
                    .setColor(winColor || "Random")
                    .setDescription(`Đây là nước **${data.Data.name.common}**`)
                    .setImage(data.flag)
                    .setFooter({text: winFooter})
                    .setTimestamp()


                const wrong = new Discord.EmbedBuilder()
                    .setTitle(`Bạn đã thua!`)
                    .setColor(lostColor || "Random")
                    .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({dynamic : true})})
                    .setDescription(`Đây là nước **${data.Data.name.common}**`)
                    .setImage(data.flag)
                    .setFooter({text: lostFooter})
                    .setTimestamp()


                 interaction.reply({embeds : [que]})
                const gameFilter = m => m.user.id
                const gameCollector = interaction.channel.createMessageCollector(gameFilter);

                gameCollector.on('collect', async msg => {
                    if (msg.author.bot) return
                    const selection = msg.content;
                    if (selection === data.Data.name.common.toLowerCase()) {
                         msg.reply({embeds : [right]})
                        gameCollector.stop()
                    } else if (selection === stopCommand) {
                         msg.reply({embeds : [wrong]})
                        gameCollector.stop();
                    } else if (selection !== data.Data.name.common) {
                        msg.reply(`**Sai!** - Nhập \`${stopCommand}\` để bỏ cuộc`)
                    }
                })

            })
    }
}