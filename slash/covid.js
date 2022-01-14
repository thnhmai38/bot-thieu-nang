const fetch = require('node-fetch');
const Discord = require('discord.js');
const { MessageActionRow, MessageButton, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "covid",
    description: "Thông tin về COVID-19",
    options: [
        {
            name: "country",
            type: 3,
            description: "Quốc gia tra cứu",
            required: false,
        }
    ],
    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
    async run (client, interaction, option) {
        
        try {
            var countries = option[0].value;
        } catch {
            var countries = "all";
        }

        if(countries === "all" || !countries){
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
                        .addField('Số ca chết : ', deaths==0?`API chưa cung cấp`:deaths)
                        .addField('Số ca chữa khỏi : ', recovered)
                        .setFooter({text: `Cập nhật lần cuối lúc ${lastUpdate}`})

                    interaction.reply({embeds : [embed]})
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
                        .addField('Số ca chết : ', deaths==0?`API cung cấp không rõ`:deaths)
                        .addField('Số ca chữa khỏi : ', recovered)
                        .setImage(`https://covid19.mathdro.id/api/countries/${countries}/og`)
                        .setFooter({text: `Cập nhật lần cuối lúc ${lastUpdate}`})
                    
                    interaction.reply({embeds : [embed]})
            }).catch(e => {
                return interaction.reply('Quốc gia được cung cấp không hợp lệ hoặc máy chủ cung cấp không phản hồi')
           })
        }
    }
}
                

