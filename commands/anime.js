const Discord = require('discord.js');
const fetch = require("node-fetch")
const Anime_Images = require('anime-images-api')
const images_api = new Anime_Images()

module.exports = {
    name: "anime",
    description: "Gives you a type of anime",
    async run(client, message, args) {
        

        var pick;
        var url;
        var content;

        if (message.channel.nsfw) {
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
        if (anime.includes(args[0])) {
            var input = args[0]
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
            content = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`Ảnh Anime ${input}`)
                    .setImage(url)
                    .setURL(url)
            message.reply({embeds: [content]});
        }
        else if (pick == 1) {
        //first
        fetch(`https://neko-love.xyz/api/v1/${input}`)
            .then(response => response.json())
            .then(data => {
                url = data.url
                content = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`Ảnh Anime ${input}`)
                    .setImage(url)
                    .setURL(url)
                message.reply({embeds: [content]});
            })
        }   
    }
}