const fetch = require('node-fetch')
module.exports = {
    name: "simsimi",
    category: "talk with simsimi",
    run: async(client, message, args) => {
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
            const text = args.join(' ')
            if(!text) return message.channel.send('Bạn nói như nói')
            const url = `https://api.simsimi.net/v1/?text=${encodeURIComponent(text)}&lang=vi_VN`
            let response
            try{
                response = await fetch(url).then(res => res.json())
            }
            catch(e) {
                return message.reply('Đã có lỗi xảy ra, vui lòng thử lại.')
            }
            message.channel.send(`**[SimSimi]** ` + response.success)
    }
}