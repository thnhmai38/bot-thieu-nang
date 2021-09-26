const Discord = require("discord.js")
const fs = require('fs');
const fetch = require("node-fetch")
require("dotenv").config();

module.exports = {
    name: "gtl",
    desciption: "đoán logo",

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
        const questionFooter = `ĐÂY LÀ CÔNG TI HAY TỔ CHỨC NÀO? Nhập ${stopCommand} để dừng chơi`;

        
        fetch(`https://api.dagpi.xyz/data/logo`, {
                headers: {
                    "Authorization": token
                }
            })
            .then(res => res.json())
            .then(data => {

                const que = new Discord.MessageEmbed()
                    .setTitle(`Đoán Logo!`)
                    .addField(`Mô tả:`, `${data.clue}`, true)
                    .addField(`Gợi ý:`, `${data.hint}`)
                    .setColor(questionColor || "RANDOM")
                    .setImage(data.question)
                    .setFooter(questionFooter || "Made by GizmoLab")


                const right = new Discord.MessageEmbed()
                    .setTitle(`Bạn đã đoán đúng!`)
                    .setAuthor(message.author.tag)
                    .setURL(data.wiki_url)
                    .setColor(winColor || "RANDOM")
                    .setDescription(`Nó là ${data.brand}`)
                    .setImage(data.answer)
                    .setFooter(winFooter || "Made by GizmoLab")


                const wrong = new Discord.MessageEmbed()
                    .setTitle(`Bạn đã thua!`)
                    .setColor(lostColor || "RANDOM")
                    .setAuthor(message.author.tag)
                    .setURL(data.wiki_url)
                    .setDescription(`Nó là ${data.brand}`)
                    .setImage(data.answer)
                    .setFooter(lostFooter || "Made by GizmoLab")


                message.channel.send({embeds : [que]})
                const gameFilter = m => m.author.id
                const gameCollector = message.channel.createMessageCollector(gameFilter);

                gameCollector.on('collect', async msg => {
                    if (msg.author.bot) return
                    const selection = msg.content.toLowerCase();
                    if (selection === data.brand.toLowerCase()) {
                        message.reply({embeds : [right]})
                        gameCollector.stop()
                    } else if (selection === stopCommand) {
                        message.channel.send({embeds : [wrong]})
                        gameCollector.stop();
                    } else if (selection !== data.brand) {
                        message.channel.send(`Sai! - Nhập ${stopCommand} để bỏ cuộc`)
                    }
                })
            })
    }
}