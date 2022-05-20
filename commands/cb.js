const Discord = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: "cb",
    description: "chat bot",

    async run(client, message, args) {
        let name = client.user.username
        let developer = 'thanhgaming5550#5126'
        var msg;
        message.reply({content: "*Đang chờ Bot trả lời...*"}).then((m) => {msg=m})
        fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${args.join(' ')}&botname=${name}&ownername=${developer}&user=${message.author.id}`)
            .then(res => res.json())
            .then(reply => {
                msg.edit({
                    content: `&&[ChatBot]** ${reply.message}`
                }).catch(err => msg.edit({
                    content: `Đã có lỗi xảy ra, vui lòng thử lại.`
                }));
            });
    }
}