const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const { MessageActionRow, MessageButton, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "meme",
    description: "Lấy một meme ngẫu nhiên từ r/dankmeme, r/meme hoặc r/memes",
    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
     async run (client, interaction, option) {
        const subReddits = ["dankmeme", "meme", "memes"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]

        const img = await randomPuppy(random);

        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`Meme`)
            .setFooter({text: `Từ r/${random}`})
            .setURL(`https://reddit.com/r/${random}`)

        interaction.reply({embeds : [embed]});
    }
}