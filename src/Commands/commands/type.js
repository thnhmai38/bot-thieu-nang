const Discord = require('discord.js');
const { MessageActionRow, MessageButton, Message, Client } = require('discord.js');
var randomWords = require('random-words');

module.exports = {
    name: "type",
    description: "Ai gõ nhanh hơn?",

    /**
    *
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    async run (client, message, args) {
        const time = Math.round(3 + Math.random() * (15 - 3));
        const word = randomWords().toLowerCase();
        const waitTime = 30;

        var main = new Discord.EmbedBuilder()
            .setColor('Red')
            .setTitle('Chuẩn bị!')
            .setDescription("**` - `**")
            .setFooter({text: 'Gõ và gửi nhanh chóng từ sắp được hiện ra'})
            .setTimestamp()
        var mainMsg = await message.reply({embeds: [main]});

        const filter = (m) => {
            return m.content.toLowerCase() == word;
        }
        setTimeout(() => {
            main = new Discord.EmbedBuilder()
                .setColor('Yellow')
                .setTitle('Nhập!')
                .setDescription(`**\`${word}\`**`)
                .setFooter({text: "Gõ và gửi nhanh chóng từ trên"})
                .setTimestamp()
            mainMsg.edit({embeds: [main]});
            const collector = mainMsg.channel.createMessageCollector({filter: filter, max:1, time: waitTime*1000})
            const wait = setTimeout(() => {
                main = new Discord.EmbedBuilder()
                    .setColor('Red')
                    .setTitle('Kết thúc!')
                    .setDescription(`Không có ai đã gửi **\`${word}\`** trong ${waitTime}s qua!`)
                    .setFooter({text: "Kết thúc!"})
                    .setTimestamp()
                mainMsg.edit({embeds: [main]});
                return collector.stop();
            }, waitTime*1000)
            collector.on("collect", (m) => {
                clearTimeout(wait);
                m.reply(`${m.author} đã gõ từ ${word} nhanh nhất!`)
                main = new Discord.EmbedBuilder()
                    .setColor('Green')
                    .setTitle('Kết thúc!')
                    .setDescription(`${m.author} đã gửi **\`${word}\`** nhanh nhất!`)
                    .setFooter({text: "Kết thúc!"})
                    .setTimestamp()
                mainMsg.edit({embeds: [main]});
                return collector.stop();
            })
        }, time*1000)
    }
}