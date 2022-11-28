const fetch = require('node-fetch')
const Discord = require("discord.js")
const {CommandInteraction, Client} = require("discord.js");
require("dotenv").config();

module.exports = {
    name: "pokemon",
    description: "Đoán pokemon",
    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
    async run (client, interaction, option) {
        var data;
        await fetch(`https://api.dagpi.xyz/data/wtp`, {
            headers: {
                "Authorization": process.env.DAGPITOKEN
            }
        }).then((res) => res.json()).then((dat) => data = dat)
        const pok = new Discord.EmbedBuilder()
            .setTitle(`Đây là Pokemon gì?`)
            .addFields([
                {name: `Thể loại:`, value:`${data.Data.Type}`},
                {name: `Năng lực:`, value: `${data.Data.abilities}`},
            ])
            .setImage(data.question)
            .setFooter({text: `Nhập stop để dừng chơi`})
            .setColor("Random")
            .setTimestamp()
        const right = new Discord.EmbedBuilder()
            .setTitle(`Bạn đã đoán đúng!`)
            .setAuthor({name: interaction.user.tag})
            .setURL(data.Data.Link)
            .setDescription(`Nó là ${data.Data.name}`)
            .setImage(data.answer)
            .setColor("Random")
            .addFields([
                {name: `Thể loại:`,value: `${data.Data.Type}`, inline:true},
                {name: `Năng lực:`,value:  `${data.Data.abilities}`},
            ])
            .setTimestamp()
        const wrong = new Discord.EmbedBuilder()
            .setTitle(`Bạn đã thua!`)
            .setAuthor({name: interaction.user.tag})
            .setURL(data.Data.Link)
            .setDescription(`Nó là ${data.Data.name}`)
            .setImage(data.answer)
            .setColor("Random")
            .addFields([
                {name: `Thể loại:`,value:`${data.Data.Type}`, inline:true},
                {name: `Năng lực:`,value: `${data.Data.abilities}`},
            ])
            .setTimestamp()
        interaction.reply({embeds : [pok]});
        const gameFilter = (m) => {
            return interaction.user.id === m.author.id
        }
        const gameCollector = interaction.channel.createMessageCollector({filter: gameFilter});

        gameCollector.on('collect', async msg => {
            const selection = msg.content.toLowerCase();
            if (selection === data.Data.name.toLowerCase()) {
                msg.reply({embeds : [right]})
                gameCollector.stop()
            } else if (selection === "stop") {
                msg.reply({embeds : [wrong]})
                gameCollector.stop();
              } else if (selection !== data.Data.name ) {
                msg.reply("**SAI!** - Nhập `stop` nếu bạn muốn dừng chơi")
              }
        })
    }
}
