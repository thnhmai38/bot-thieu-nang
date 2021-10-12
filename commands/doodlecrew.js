const Discord = require('discord.js');
const { DiscordTogether } = require('discord-together');

module.exports = {
    name: "doodlecrew",
    description: "play doodlecrew",

    async run (client, message, args){
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
        client.discordTogether = new DiscordTogether(client);
        if(message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'doodlecrew').then(async invite => {
                return message.channel.send(`BẤM VÀO **LIÊN KẾT** ĐÂY : ${invite.code}`)  
            });
        } else message.channel.send(`Bạn phải ở trong 1 kênh nói thoại`);
    }
}