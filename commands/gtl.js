const Discord = require("discord.js")
const fs = require('fs');
const fetch = require("node-fetch")
require("dotenv").config();

module.exports = {
    name: "gtl",
    desciption: "đoán logo",

    async run(client, message, args) {
        

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
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic : true}))
                    .setColor(winColor || "RANDOM")
                    .setDescription(`Đây là Logo của **${data.brand}**`)
                    .setImage(data.answer)
                    .setFooter(winFooter)
                    .setTimestamp()
                    .addField(`Mô tả: `, `${data.clue ? data.clue : "Không có"}`, true)


                const wrong = new Discord.MessageEmbed()
                    .setTitle(`Bạn đã thua!`)
                    .setColor(lostColor || "RANDOM")
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic : true}))
                    .setDescription(`Đây là Logo của **${data.brand}**`)
                    .setImage(data.answer)
                    .setFooter(lostFooter)
                    .setTimestamp()
                    .addField(`Mô tả: `, `${data.clue ? data.clue : "Không có"}`, true)


                message.reply({embeds : [que]})
                const gameFilter = m => m.author.id
                const gameCollector = message.channel.createMessageCollector(gameFilter);

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