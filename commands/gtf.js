const Discord = require("discord.js")
const fs = require('fs');
const fetch = require("node-fetch")
require("dotenv").config();

module.exports = {
    name: "gtf",
    desciption: "đoán cờ",

    async run(client, message, args) {
        

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
                    .addField(`Thủ đô: `, `${data.Data.capital}`)
                    .setColor(questionColor || "RANDOM")
                    .setImage(data.flag)
                    .setFooter(questionFooter)
                    .setTimestamp()


                const right = new Discord.MessageEmbed()
                    .setTitle(`Bạn đã đoán đúng!`)
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic : true}))
                    .setColor(winColor || "RANDOM")
                    .setDescription(`Đây là nước **${data.Data.name.common}**`)
                    .setImage(data.flag)
                    .setFooter(winFooter)
                    .setTimestamp()
                    .addField(`Thủ đô: `, `${data.Data.capital}`)


                const wrong = new Discord.MessageEmbed()
                    .setTitle(`Bạn đã thua!`)
                    .setColor(lostColor || "RANDOM")
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic : true}))
                    .setDescription(`Đây là nước **${data.Data.name.common}**`)
                    .setImage(data.flag)
                    .setFooter(lostFooter)
                    .setTimestamp()
                    .addField(`Thủ đô: `, `${data.Data.capital}`)


                message.reply({embeds : [que]})
                const gameFilter = m => m.author.id
                const gameCollector = message.channel.createMessageCollector(gameFilter);

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