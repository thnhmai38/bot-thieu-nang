const Discord = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: "cb",
    description: "chat bot",

    async run(client, message, args) {
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
        let name = client.user.username
        let developer = 'thanhgaming5550#5550'

        fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${args.join(' ')}&botname=${name}&ownername=${developer}&user=${message.author.id}`)
            .then(res => res.json())
            .then(reply => {

                message.channel.send({
                    content: `${reply.message}`
                }).catch(err => message.channel.send({
                    content: `Đã xảy ra lỗi : ${err}`
                }));
            });
    }
}