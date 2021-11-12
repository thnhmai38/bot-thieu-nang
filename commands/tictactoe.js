const simplydjs = require('simply-djs')

module.exports = {
    name : 'tictactoe',
    run : async(client, message, args) => {
        

        const member = message.mentions.members.first() 
            if(!member) return message.reply('Bạn không thể chơi một mình được :(')
        
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