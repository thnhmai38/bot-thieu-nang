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
                    .addFields([    
                        {name: `Thủ đô: `, value: `${data.Data.capital}`}
                    ])
                    .setColor(questionColor || "Random")
                    .setImage(data.flag)
                    .setFooter({text: questionFooter})
                    .setTimestamp()


                const right = new Discord.EmbedBuilder()
                    .setTitle(`Bạn đã đoán đúng!`)
                    .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic : true})})
                    .setColor(winColor || "Random")
                    .setDescription(`Đây là nước **${data.Data.name.common}**`)
                    .setImage(data.flag)
                    .setFooter({text: winFooter})
                    .setTimestamp()
                    .addFields([{name: `Thủ đô: `, value: `${data.Data.capital}`}])


                const wrong = new Discord.EmbedBuilder()
                    .setTitle(`Bạn đã thua!`)
                    .setColor(lostColor || "Random")
                    .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic : true})})
                    .setDescription(`Đây là nước **${data.Data.name.common}**`)
                    .setImage(data.flag)
                    .setFooter({text: lostFooter})
                    .setTimestamp()
                    .addFields([{name: `Thủ đô: `, value: `${data.Data.capital}`}])


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