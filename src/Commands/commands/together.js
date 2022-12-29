const Discord = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, Message, Client } = require('discord.js');
const { DiscordTogether } = require('discord-together');
const activity = ["youtube","youtubedev","poker","betrayal","fishing","chess","chessdev","lettertile","wordsnack","doodlecrew","awkword","spellcast","checkers","puttparty","sketchheads","ocho","puttpartyqa","sketchyartist","land","meme","askaway","bobble"]

module.exports = {
    name: "together",
    description: "together",

    /**
    *
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    async run (client, message, args) {
        client.discordTogether = new DiscordTogether(client);
        if (!args[0]) return message.reply(`Các hoạt động khả dụng: **\`${activity.join(", ")}\`**`);
        active = args[0].toLowerCase();
        if (!activity.includes(active)) return message.reply(`Các hoạt động khả dụng: **\`${activity.join(", ")}\`**`);
        if(message.member.voice.channel) {
            try {
                client.discordTogether.createTogetherCode(message.member.voice.channel.id, active)
                .then(async invite => {
                    return message.reply(`BẤM VÀO **LIÊN KẾT** ĐÂY : ${invite.code}`)  
                })
            } catch (e) {
                message.reply(`Đã xảy ra lỗi: **\`${e}\`**`)
            }
        } else message.reply(`Bạn phải ở trong 1 kênh nói thoại`);
    }
}