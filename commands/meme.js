const Discord = require('discord.js');
const randomPuppy = require('random-puppy');

module.exports = {
    name: "meme",
    description: "Gives you a meme",
    async run (client, message, args){
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)

        const subReddits = ["dankmeme", "meme", "memes"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]

        const img = await randomPuppy(random);

        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(img)
        .setTitle(`Meme`)
        .setFooter(`Từ r/${random}`)
        .setURL(`https://reddit.com/r/${random}`)

        message.channel.send({embeds : [embed]});
    }
}