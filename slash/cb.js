const Discord = require('discord.js');
const fetch = require('node-fetch')
const { MessageActionRow, MessageButton, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "cb",
    description: "Nói chuyện với Bot (Tiếng Anh)",
    options: [
        {
            name: "text",
            type: 3,
            description: "Lời nói của bạn với Bot (Tiếng Anh)",
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
        let name = client.user.username;
        let developer = 'thanhgaming5550#5126';
        await interaction.reply({content: "*Đang chờ Bot trả lời...*"})
        fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${option[0].value}&botname=${name}&ownername=${developer}&user=${interaction.user.id}`)
            .then(res => res.json())
            .then(reply => {
                interaction.editReply({
                    content: `**[ChatBot]** ${reply.message}`
                }).catch(err => interaction.editReply({
                    content: `Đã có lỗi xảy ra, vui lòng thử lại.`
                }));
            });
    }
}