const Discord = require('discord.js')

module.exports = {
    name: "choose",
    description: "random args",

    async run (client, message, args) {
        
        if (!args.length) {message.reply(`Chọn gì ta... Hmmmm...`)} else {message.reply(args[Math.floor(Math.random() * args.length)])}    
    }
}
