const Discord = require('discord.js')

module.exports = {
    name: "choose",
    description: "random args",

    async run (client, message, args) {
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
        if (!args.length) {message.channel.send(`Chọn gì ta... Hmmmm...`)} else {message.channel.send(args[Math.floor(Math.random() * args.length)])}    
    }
}
