const fetch = require('node-fetch')
module.exports = {
    name: "simsimi",
    category: "talk with simsimi",
    run: async(client, message, args) => {
            const text = args.join(' ')
            if(!text) return message.reply('Bạn nói như nói')
            const url = `https://api.simsimi.net/v2/?text=${encodeURIComponent(text)}&lc=vn&cf=false`
            var msg;
            message.reply({content: "*Đang đợi SimSimi trả lời...*"}).then((m) => msg=m);
            let response
            try{
                response = await fetch(url).then(res => res.json())
            }
            catch(e) {
                return msg.edit('Đã có lỗi xảy ra, vui lòng thử lại.')
            }
            msg.edit({content: `**[SimSimi]** ` + response.success + `${response.noti !== "nope" ? `\n\`${response.noti}\`` : ``}`})
    }
}