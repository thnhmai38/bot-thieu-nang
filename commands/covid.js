const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: "covid",
    description: "Covid-19 News",

    async run (client, message, args) {
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
        let countries = args.join(" ");

        if(args[0] === "all" || !args[0]){
                fetch(`https://covid19.mathdro.id/api/`)
                .then(response => response.json())
                .then(data => {
                    let confirmed = data.confirmed.value.toLocaleString()
                    let recovered = data.recovered.value.toLocaleString()
                    let deaths = data.deaths.value.toLocaleString()
                    let lastUpdate = data.lastUpdate.toLocaleString()

                    const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`Thông tin COVID-19 ở trên thế giới`)
                    .setImage(`https://covid19.mathdro.id/api/og`)
                    .addField('Số ca nhiễm : ', confirmed)
                    .addField('Số ca chết : ', deaths)
                    .addField('Số ca chữa khỏi : ', recovered)
                    .setFooter(`Cập nhật lần cuối lúc ${lastUpdate}`)

                    message.channel.send({embeds : [embed]})
                })
            } else {
                fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
                .then(response => response.json())
                .then(data => {
                    let confirmed = data.confirmed.value.toLocaleString()
                    let recovered = data.recovered.value.toLocaleString()
                    let deaths = data.deaths.value.toLocaleString()
                    let lastUpdate = data.lastUpdate.toLocaleString()

                    const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`Thông tin COVID-19 ở **${countries}**`)
                    .addField('Số ca nhiễm : ', confirmed)
                    .addField('Số ca chết : ', deaths)
                    .addField('Số ca chữa khỏi : ', recovered)
                    .setImage(`https://covid19.mathdro.id/api/countries/${countries}/og`)
                    .setFooter(`Cập nhật lần cuối lúc ${lastUpdate}`)
                    
                    message.channel.send({embeds : [embed]})
            }).catch(e => {
                return message.channel.send('Quốc gia được cung cấp không hợp lệ hoặc máy chủ cung cấp không phản hồi')
           })
        }
    }
}
                

