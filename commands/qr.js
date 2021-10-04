const { Utils } = require('djs-utils')
const Discord = require("discord.js");

module.exports = {
    name: "qr",
    desciption: "Create QR Code",

    async run (client, message, args) {
    const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
        const util = new Utils({
            args: args[0],
            message: message,
            slashCommand: false,
            embedFooter: `Tạo bởi ${message.author.name}`, //The Footer of the embed
            embedTitle: 'Đã tạo xong mã QR', //The title of the embed
            embedColor: 'RANDOM', //The color of the embed! (Use Hex codes or use the color name)
          })
        util.qrcode()
    }
}
