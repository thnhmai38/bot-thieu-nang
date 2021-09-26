const discord = require('discord.js')

class cmdlog {

    constructor() {
        this.gameEmbed = null
    }

    log (message) {
        console.log(`${message.author.tag} ${message.author} : ${message}`)
    }
}

module.exports = cmdlog;