const Discord = require('discord.js')
function randomXToY(minVal,maxVal)
{
  var randVal = (minVal+(Math.random()*(maxVal-minVal))).toString();
  return Math.round(randVal);
}

module.exports = {
    name: "roll",
    description: "roll",

    async run (client, message, args) {
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
            
        if (isNaN(args[0]) || isNaN(args[1])) {message.channel.send("Vui lòng nhập số")} 
        else {
            var x = Number(args[0])
            var y = Number(args[1])
            if (x>y) message.channel.send(`Làm gì có số nào trong khoảng đó :)))`)
        else {
            if (args[0].length < 23 && args[1].length < 23) {
                var x = Number(args[0])
                var y = Number(args[1])
                var roll = randomXToY(x, y)
                message.channel.send(`🎲 ${message.author} xúc ra **${roll}** điểm`);
            } else if (message.member.permissions.has(`MANAGE_MESSAGES`)) {
                var x = Number(args[0])
                var y = Number(args[1])
                var roll = randomXToY(x, y)
                if (roll == "Infinity") {message.channel.send(`Hoa hết cả mắt :face_with_spiral_eyes:`)} 
                else {
                const n2 = BigInt(roll)
                message.channel.send(`🎲 ${message.author} xúc ra **${n2.toString()}** điểm`);
            } 
        } else message.channel.send("Số trên có nhiều hơn 22 chữ số yêu cầu bạn phải có quyền **Quản lí Tin nhắn** để tránh *SPAM*")
    }
}}}
