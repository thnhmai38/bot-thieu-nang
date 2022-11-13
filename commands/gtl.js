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
        const winColor = "Green"
        const lostColor = "Red";
        const lostFooter = "BẠN ĐÃ THUA!";
        const questionColor = "Blue";
        const stopCommand = "stop"
        const questionFooter = `ĐÂY LÀ LOGO CỦA CÁI GÌ? Nhập ${stopCommand} để dừng chơi`;

        
        fetch(`https://api.dagpi.xyz/data/logo`, {
                headers: {
                    "Authorization": token
                }
            })
            .then(res => res.json())
            .then(data => {

                const que = new Discord.EmbedBuilder()
                    .setTitle(`Đoán Logo!`)
                    .addFields([
                        {name: `Mô tả: `, value: `${data.clue ? data.clue : "Không có"}`},
                        {name: `Gợi ý: `, value: `${data.hint}`}
                    ])
                    .setColor(questionColor || "Random")
                    .setImage(data.question)
                    .setFooter({text: questionFooter})
                    .setTimestamp()


                const right = new Discord.EmbedBuilder()
                    .setTitle(`Bạn đã đoán đúng!`)
                    .setAuthor({name: message.author.tag, iconURL:message.author.displayAvatarURL({dynamic : true})})
                    .setColor(winColor || "Random")
                    .setDescription(`Đây là Logo của **${data.brand}**`)
                    .setImage(data.answer)
                    .setFooter({text: winFooter})
                    .setTimestamp()
                    .addFields([{name: `Mô tả: `, value: `${data.clue ? data.clue : "Không có"}`}])


                const wrong = new Discord.EmbedBuilder()
                    .setTitle(`Bạn đã thua!`)
                    .setColor(lostColor || "Random")
                    .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic : true})})
                    .setDescription(`Đây là Logo của **${data.brand}**`)
                    .setImage(data.answer)
                    .setFooter({text: lostFooter})
                    .setTimestamp()
                    .addFields([{name: `Mô tả: `, value: `${data.clue ? data.clue : "Không có"}`}])


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