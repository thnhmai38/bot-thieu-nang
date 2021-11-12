const Discord = require('discord.js')
const fetch = require('node-fetch')
const axios = require("axios") 
const { MessageActionRow, MessageButton, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Trả về Avatar và Banner của người dùng",
    options: [
        {
            name: "user",
            type: 6,
            description: "Người chỉ định",
            required: false
        }],
    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
    async run (client, interaction, option) {
        try {
            var member = client.users.cache.find(user => user.id === `${option[0].value}`)
        } catch {
            var member = interaction.user;
        }
        //avatar
        const avatar = member.displayAvatarURL({dynamic : true})
        const avt = new Discord.MessageEmbed()
            .setTitle(`Ảnh đại diện của **${member.username}**`)
            .setImage(`${avatar}?size=1024`)
            .setColor("RANDOM")
            .setURL(`${avatar}?size=1024`)
        
        //banner
        async function getUserBannerUrl(userId, { dynamicFormat = true, defaultFormat = "webp", size = 512 } = {}) {

            if (![16, 32, 64, 128, 256, 512, 1024, 2048, 4096].includes(size)) {
                throw new Error(`The size '${size}' is not supported!`);
            }
        
            if (!["webp", "png", "jpg", "jpeg"].includes(defaultFormat)) {
                throw new Error(`The format '${defaultFormat}' is not supported as a default format!`);
            }
        
            const user = await client.api.users(userId).get();
            if (!user.banner) return null;
        
            const query = `?size=${size}`;
            const baseUrl = `https://cdn.discordapp.com/banners/${userId}/${user.banner}`;
        
            if (dynamicFormat) {
                const { headers } = await axios.head(baseUrl);
                if (headers && headers.hasOwnProperty("content-type")) {
                    return baseUrl + (headers["content-type"] == "image/gif" ? ".gif" : `.${defaultFormat}`) + query;
                }
            }
        
            return baseUrl + `.${defaultFormat}` + query;
        
        }
        const bnn = await getUserBannerUrl(member.id, { size: 1024 })
        if (!bnn) {
            interaction.reply({content: `**${member.username}** không có Ảnh Biểu ngữ :(`, embeds : [avt]})
        }
        else {
            const br = new Discord.MessageEmbed()
                .setTitle(`Ảnh biểu ngữ của **${member.username}**`)
                .setImage(bnn)
                .setColor("RANDOM")
                .setURL(bnn)
        interaction.reply({embeds : [br, avt]})
        }
    }
}