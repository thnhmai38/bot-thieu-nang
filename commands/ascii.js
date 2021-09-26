const figlet = require('figlet');
const colors = require("colors");

module.exports = {
    name: "ascii",
    description: "Converts text to ascii",

    async run (client, message, args){
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
        if(!args[0]) return message.channel.send('Không có chữ mình làm bằng trời à ????');
        msg = args.join(" ");

        figlet.text(msg, function (err, data){
            if(err){
                message.channel.send("Đã xảy ra lỗi, xin vui lòng thử lại")
                console.log(colors.red('LỖI (ascii.js)'))
                console.dir(err)
            }
            if(data.length > 2000) return message.channel.send('VUI LÒNG ĐIỀN NGẮN HƠN 2000 KÍ TỰ')

            message.channel.send('```' + data + '```')
        })
    }
}