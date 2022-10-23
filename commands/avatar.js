const Discord = require('discord.js')
const fetch = require('node-fetch')
const axios = require("axios") 

module.exports = {
    name: "avatar",
    description: "Brodcast someone's avatar",

    async run (client, message, args) {
        
        let member = message.mentions.users.first() || message.author
        //avatar
        let avatar = member.displayAvatarURL({dynamic : true})
        const avt = new Discord.EmbedBuilder()
            .setTitle(`Ảnh đại diện của **${member.username}**`)
            .setImage(`${avatar}?size=1024`)
            .setColor("Random")
            .setURL(`${avatar}?size=1024`)
        
        //banner
        async function getUserBannerUrl(userId, { dynamicFormat = true, defaultFormat = "webp", size = 512 } = {}) {

            // Supported image sizes, inspired by 'https://discord.js.org/#/docs/main/stable/typedef/ImageURLOptions'.
            if (![16, 32, 64, 128, 256, 512, 1024, 2048, 4096].includes(size)) {
                throw new Error(`The size '${size}' is not supported!`);
            }
        
            // We don't support gif as a default format,
            // because requesting .gif format when the original image is not a gif,
            // would result in an error 415 Unsupported Media Type.
            // If you want gif support, enable dynamicFormat, .gif will be used when is it available.
            if (!["webp", "png", "jpg", "jpeg"].includes(defaultFormat)) {
                throw new Error(`The format '${defaultFormat}' is not supported as a default format!`);
            }
        
            // We use raw API request to get the User object from Discord API,
            // since the discord.js v12's one doens't support .banner property.
            const user = await client.api.users(userId).get();
            if (!user.banner) return null;
        
            const query = `?size=${size}`;
            const baseUrl = `https://cdn.discordapp.com/banners/${userId}/${user.banner}`;
        
            // If dynamic format is enabled we perform a HTTP HEAD request,
            // so we can use the content-type header to determine,
            // if the image is a gif or not.
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
            message.reply({content: `**${member.username}** không có Ảnh Biểu ngữ :(`, embed: avt})
        }
        else {
            const br = new Discord.EmbedBuilder()
                .setTitle(`Ảnh biểu ngữ của **${member.username}**`)
                .setImage(bnn)
                .setColor("Random")
                .setURL(bnn)
        message.reply({embeds : [br, avt]})
        }
    }
}