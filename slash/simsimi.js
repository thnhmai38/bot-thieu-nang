const fetch = require('node-fetch')
const Discord = require('discord.js')
const { MessageActionRow, MessageButton, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "simsimi",
    description: "Nói chuyện với SimSimi (Tiếng Việt)",
    options: [
        {
            name: "text",
            type: 3,
            description: "Lời nói của bạn với SimSimi (Tiếng Việt)",
            required: true,
        }
    ],
    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
     async run (client, interaction, option) {
            const text = option[0].value;
            // const url = `https://api.simsimi.net/v2/?text=${encodeURIComponent(text)}&lc=vn&cf=false`
            // API bảo trì
            const url = `https://tuanxuong.com/api/simsimi/index.php?text=${encodeURIComponent(text)}`
            await interaction.reply({content: "*Đang đợi SimSimi trả lời...*"});
            let response
            try {
                response = await fetch(url).then(res => res)
                response = JSON.parse(response).json();
            }
            catch (e) {
                return interaction.editReply({content: 'Đã có lỗi xảy ra, vui lòng thử lại.'})
            }
            //interaction.editReply({content: `**[SimSimi]** ` + response.success + `${response.noti !== "nope" ? `\n\`${response.noti}\`` : ``}`})
            //API Bảo trì
            interaction.editReply({content: `**[SimSimi]** ` + JSON.parse(response.response)})
    }
}