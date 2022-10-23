const Discord = require('discord.js');
const fetch = require("node-fetch")
const Anime_Images = require('anime-images-api')
const images_api = new Anime_Images()
const { ActionRowBuilder, ButtonBuilder, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "anime",
    description: "Đưa bạn một hình ảnh Anime",
    options: [
        {
            name: "type",
            type: 3,
            description: "Thể loại bạn muốn chỉ định",
            required: true,
            choices: [
                {
                    name: "Ngẫu nhiên",
                    value: "random"
                },
                {
                    name: "neko",
                    value: "neko"
                },
                {
                    name: "kitsune",
                    value: "kitsune"
                },
                {
                    name: "pat",
                    value: "pat"
                },
                {
                    name: "hug",
                    value: "hug"
                },
                {
                    name: "waifu",
                    value: "waifu"
                },
                {
                    name: "cry",
                    value: "cry"
                },
                {
                    name: "kiss",
                    value: "kiss"
                },
                {
                    name: "slap",
                    value: "slap"
                },
                {
                    name: "smug",
                    value: "smug"
                },
                {
                    name: "punch",
                    value: "punch"
                },
                {
                    name: "wink",
                    value: "wink"
                },
                {
                    name: "kill",
                    value: "kill"
                },
                {
                    name: "cuddle",
                    value: "cuddle"
                },
                {
                    name: "nekolewd [NSFW]",
                    value: "nekolewd"
                },
                {
                    name: "boobs [NSFW]",
                    value: "boobs"
                },
                {
                    name: "lesbian [NSFW]",
                    value: "lesbian"
                },
                {
                    name: "hentai [NSFW]",
                    value: "hentai"
                },
            ]
        }],
    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
     async run (client, interaction, option) {

        var pick;
        var url;
        var content;

        if (interaction.channel.nsfw) {
            //NSFW
            var anime = ["neko", "nekolewd", "kitsune", "pat", "hug", "waifu", "cry", "kiss", "slap", "smug", "punch","wink","kill","cuddle","boobs","lesbian","hentai"]
            var first = ["neko", "nekolewd", "kitsune", "pat", "hug", "waifu", "cry", "kiss", "slap", "smug", "punch"]
            var sencond = ["hug", "kiss","slap","punch","pat","kill","cuddle","wafiu","hentai","boobs","lesbian","wink"]
            //var nsfw_sencond = ["hentai","boobs","lesbian"]
            nsfw = true;
        } else {
            //SFW
            var anime = ["neko", "kitsune", "pat", "hug", "waifu", "cry", "kiss", "slap", "smug", "punch","wink","kill","cuddle"]
            var first = ["neko", "kitsune", "pat", "hug", "waifu", "cry", "kiss", "slap", "smug", "punch"]
            var sencond = ["hug", "kiss","slap","punch","wink","pat","kill","cuddle","wafiu"]
            nsfw = false;
        }

        //input
        
        if (!option[0].value || anime.includes(option[0].value)) {
            var input = option[0].value
        } else {
            var input = anime[Math.floor(Math.random() * anime.length)]
        }
        if (first.includes(input) && sencond.includes(input)) {var pick = Math.floor(Math.random() * 2)}
        else if (first.includes(input) && !sencond.includes(input)) {var pick = 1}
        else var pick = 2;

        if (pick == 2) {
            var json;
        //sencond
            if (input == "hug") {
                json = await images_api.sfw.hug()
            } else if (input == "kiss") {
                json = await images_api.sfw.kiss()
            } else if (input == "slap") {
                json = await images_api.sfw.slap()
            } else if (input == "punch") {
                json = await images_api.sfw.punch()
            } else if (input == "wink") {
                json = await images_api.sfw.wink()
            } else if (input == "pat") {
                json = await images_api.sfw.pat()
            } else if (input == "kill") {
                json = await images_api.sfw.kill()
            } else if (input == "cuddle") {
                json = await images_api.sfw.cuddle()
            } else if (input == "wafiu") {
                json = await images_api.sfw.wafiu()
            } else if (input == "hentai") {
                json = await images_api.nsfw.hentai()
            } else if (input == "boobs") {
                json = await images_api.nsfw.boobs()
            } else if (input == "lesbian") {
                json = await images_api.nsfw.lesbian()
            }
            url = json.image;
            content = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setTitle(`Ảnh Anime ${input}`)
                    .setImage(url)
                    .setURL(url)
            interaction.reply({embeds: [content]});
        }
        else {
        //first
        fetch(`https://neko-love.xyz/api/v1/${input}`)
            .then(response => response.json())
            .then(data => {
                url = data.url
                content = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setTitle(`Ảnh Anime ${input}`)
                    .setImage(url)
                    .setURL(url)
                interaction.reply({embeds: [content]});
            })
        }   
    }
}