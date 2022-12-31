const figlet = require('figlet');

module.exports = {
    name: "ascii",
    description: "Converts text to ascii",

    async run (client, message, args){
        
        if(!args[0]) return message.reply('Không có chữ mình làm bằng trời à ????');
        msg = args.join(" ");

        figlet.text(msg, function (err, data){
            if(err){
                message.reply("Đã xảy ra lỗi, xin vui lòng thử lại")
                console.error(err);
            }
            if(data.length > 2000) return message.reply('VUI LÒNG ĐIỀN NGẮN HƠN 2000 KÍ TỰ')

            message.reply('```' + data + '```')
        })
    }
}