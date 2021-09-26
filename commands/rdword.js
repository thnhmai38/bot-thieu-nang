var randomWords = require('random-words');
function isNaturalNumber(n) {
    n = n.toString(); // force the value incase it is not
    var n1 = Math.abs(n),
        n2 = parseInt(n, 10);
    return !isNaN(n1) && n2 === n1 && n1.toString() === n;
}

module.exports = {
    name: "rdword",
    description: "random words",

    async run (client, message, args){
        // args0=exactly args1=WordPerString args2=maxLength
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
        if (!args[0]) {args[0]="1"}
        if (!args[1]) {args[1]="1"}
        if (!args[2]) {args[2]="0"}
        const exactly = Number(args[0])
        const WordPerString = Number(args[1])
        const maxLength = Number(args[2])
        //check
        if  (isNaN(exactly) || isNaN(WordPerString) || isNaN(maxLength)) return message.channel.send(`Vui lòng bỏ hoặc nhập đúng giá trị tùy chỉnh`)
        if (exactly == 0 || WordPerString == 0 || !isNaturalNumber(exactly) || !isNaturalNumber(WordPerString) || !isNaturalNumber(maxLength)) return message.channel.send(`Vui lòng bỏ hoặc nhập đúng giá trị tùy chỉnh`)
        //run
        if (exactly*WordPerString > 30) {if (message.member.permissions.has("MANAGE_MESSAGES")) {
            if (maxLength == 0) {message.channel.send(randomWords({exactly: exactly, wordsPerString: WordPerString, join: ' - ' }))} else {
                message.channel.send(randomWords({exactly: exactly, wordsPerString: WordPerString, maxLength: maxLength, join: ' - ' }))
            }
        } else message.channel.send(`Tổng cộng có 30 từ trở lên yêu cầu quyền **QUẢN LÍ TIN NHẮN**`)
    } else {
        if (maxLength == 0) {message.channel.send(randomWords({exactly: exactly, wordsPerString: WordPerString, join: ' - ' }))} else {
            message.channel.send(randomWords({exactly: exactly, wordsPerString: WordPerString, maxLength: maxLength, join: ' - ' }))
        }
        }
    }
}