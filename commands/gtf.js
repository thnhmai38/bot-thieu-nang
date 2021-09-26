const Discord = require("discord.js")
const fs = require('fs');
const fetch = require("node-fetch")
require("dotenv").config();

module.exports = {
    name: "gtf",
    desciption: "đoán cờ",

    async run(client, message, args) {
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)

        const dagpiToken = process.env.DAGPITOKEN;
        const token = dagpiToken;
        const winFooter = "BẠN ĐÃ THẮNG!";
        const winColor = "GREEN"
        const lostColor = "RED";
        const lostFooter = "BẠN ĐÃ THUA!";
        const questionColor = "BLUE";
        const stopCommand = "stop"
        const questionFooter = `ĐÂY LÀ NƯỚC NÀO? Nhập ${stopCommand} để dừng chơi`;

        fetch(`https://api.dagpi.xyz/data/flag`, {
                headers: {
                    "Authorization": token
                }
            })
            .then(res => res.json())
            .then(data => {

                const que = new Discord.MessageEmbed()
                    .setTitle(`ĐOÁN CỜ!`)
                    .addField(`Thủ đô:`, `${data.Data.capital}`)
                    .setColor(questionColor || "RANDOM")
                    .setImage(data.flag)
                    .setFooter(questionFooter || "Made by GizmoLab")


                const right = new Discord.MessageEmbed()
                    .setTitle(`Bạn đã đoán đúng!`)
                    .setAuthor(message.author.tag)
                    .setColor(winColor || "RANDOM")
                    .setDescription(`Đây là nước ${data.Data.name.common}`)
                    .setImage(data.flag)
                    .setFooter(winFooter || "Made by GizmoLab")


                const wrong = new Discord.MessageEmbed()
                    .setTitle(`Bạn đã thua!`)
                    .setColor(lostColor || "RANDOM")
                    .setAuthor(message.author.tag)
                    .setDescription(`Đây là nước ${data.Data.name.common}`)
                    .setImage(data.flag)
                    .setFooter(lostFooter || "Made by GizmoLab")


                message.channel.send({embeds : [que]})
                const gameFilter = m => m.author.id
                const gameCollector = message.channel.createMessageCollector(gameFilter);

                gameCollector.on('collect', async msg => {
                    if (msg.author.bot) return
                    const selection = msg.content;
                    if (selection === data.Data.name.common.toLowerCase()) {
                        message.reply({embeds : [right]})
                        gameCollector.stop()
                    } else if (selection === stopCommand) {
                        message.channel.send({embeds : [wrong]})
                        gameCollector.stop();
                    } else if (selection !== data.Data.name.common) {
                        message.channel.send(`Sai! - Nhập ${stopCommand} để bỏ cuộc`)
                    }
                })

            })
    }
}