const Minesweeper = require('discord.js-minesweeper');

function isNaturalNumber(n) {
    n = n.toString(); // force the value incase it is not
    var n1 = Math.abs(n),
        n2 = parseInt(n, 10);
    return !isNaN(n1) && n2 === n1 && n1.toString() === n;
}

module.exports = {
    name: "daomin",
    description: "Choi dao min",

    async run(client, message, args) {
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
        if (!args[0]) {
            const minesweeper = new Minesweeper({
                rows: 9,
                columns: 9,
                mines: 10,
                emote: 'boom',
                returnType: 'emoji',
            })
            message.channel.send(`${message.author} khởi tạo Đào mìn 9x9, số lượng mìn 10`)
            message.channel.send(minesweeper.start());
        } else if (!args[2] || !isNaturalNumber(args[0]) || !isNaturalNumber(args[1]) || !isNaturalNumber(args[2]) || args[0] == `0` || args[1] == `0` || args[2] == `0` || Number(args[0]) * Number(args[1]) <= Number(args[2])) {
            message.channel.send(`Vui lòng bỏ hoặc nhập chính xác giá trị tùy chỉnh`)
        } else {
            let row = Number(args[0])
            let col = Number(args[1])
            let mine = Number(args[2])
            const minesweeper = new Minesweeper({
                rows: row,
                columns: col,
                mines: mine,
                emote: 'boom',
                returnType: 'emoji',
            })
            ms = `${minesweeper.start()}`
            if (ms.length > 2000) {
                message.channel.send(`Hoa hết cả mắt :face_with_spiral_eyes:`)
            } else {
                message.channel.send(`${message.author} khởi tạo Đào mìn ${row}x${col}, số lượng mìn ${mine}`)
                message.channel.send(ms);
            }
        }
    }
}
