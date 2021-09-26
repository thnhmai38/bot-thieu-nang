const Discord = require('discord.js');

module.exports = {
        name: "help",
        description: "command list",

        async run(client, message, args) {
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
        const help = new Discord.MessageEmbed()
                .setTitle(`**-> NHẤN VÀO ĐỂ XEM HƯỚNG DẪN SỬ DỤNG <-**`)
                .setDescription(`Hướng dẫn sử dụng Bot Thieu Nang`)
                .setThumbnail('https://i.imgur.com/gfnBgbS.png')
                .setURL(`https://bit.ly/btnguide`)
                .setTimestamp()
                .setColor("RANDOM")
        message.channel.send({embeds : [help]});
   }
} 