const simplydjs = require('simply-djs')

module.exports = {
    name : 'tictactoe',
    run : async(client, message, args) => {
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)

        const member = message.mentions.members.first() 
            if(!member) return message.channel.send('Bạn không thể chơi một mình được :(')
        
            simplydjs.tictactoe(client, message, {
                credit: false,
                xEmoji: '❌', //default: 
                oEmoji: '⭕', //default: ⭕
                idleEmoji: '➖', //default: ➖
                embedColor: '#075FFF', //default: #075FFF
                embedFoot: 'Chúc may mắn!',//default: 'Make sure to win ;)'.
                slash: false
            })
    }
}