const Discord = require("discord.js")
const fs = require('fs');
const fetch = require("node-fetch")
require("dotenv").config();
const { MessageActionRow, MessageButton, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "gtl",
    description: "Đoán Logo",
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
        const winColor = "GREEN"
        const lostColor = "RED";
        const lostFooter = "BẠN ĐÃ THUA!";
        const questionColor = "BLUE";
        const stopCommand = "stop"
        const questionFooter = `ĐÂY LÀ LOGO CỦA CÁI GÌ? Nhập ${stopCommand} để dừng chơi`;

        
        fetch(`https://api.dagpi.xyz/data/logo`, {
                headers: {
                    "Authorization": token
                }
            })
            .then(res => res.json())
            .then(data => {

                const que = new Discord.MessageEmbed()
                    .setTitle(`Đoán Logo!`)
                    .addField(`Mô tả: `, `${data.clue ? data.clue : "Không có"}`, true)
                    .addField(`Gợi ý: `, `${data.hint}`)
                    .setColor(questionColor || "RANDOM")
                    .setImage(data.question)
                    .setFooter(questionFooter)
                    .setTimestamp()

                const right = new Discord.MessageEmbed()
                    .setTitle(`Bạn đã đoán đúng!`)
                    .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({dynamic : true}))
                    .setColor(winColor || "RANDOM")
                    .setDescription(`Đây là Logo của **${data.brand}**`)
                    .setImage(data.answer)
                    .setFooter(winFooter)
                    .addField(`Mô tả: `, `${data.clue ? data.clue : "Không có"}`, true)
                    .setTimestamp()


                const wrong = new Discord.MessageEmbed()
                    .setTitle(`Bạn đã thua!`)
                    .setColor(lostColor || "RANDOM")
                    .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({dynamic : true}))
                    .setDescription(`Đây là Logo của **${data.brand}**`)
                    .setImage(data.answer)
                    .setFooter(lostFooter)
                    .addField(`Mô tả: `, `${data.clue ? data.clue : "Không có"}`, true)
                    .setTimestamp()


                interaction.reply({embeds : [que]})
                const gameFilter = m => m.user.id
                const gameCollector = interaction.channel.createMessageCollector(gameFilter);

                gameCollector.on('collect', async msg => {
                    if (msg.author.bot) return
                    const selection = msg.content.toLowerCase();
                    if (selection === data.brand.toLowerCase()) {
                        msg.reply({embeds : [right]})
                        gameCollector.stop()
                    } else if (selection === stopCommand) {
                        msg.reply({embeds : [wrong]})
                        gameCollector.stop();
                    } else if (selection !== data.brand) {
                        msg.reply(`**Sai!** - Nhập \`${stopCommand}\` để bỏ cuộc`)
                    }
                })
            })
    }
}