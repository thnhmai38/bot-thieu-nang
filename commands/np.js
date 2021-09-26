const Discord = require('discord.js')
const { Player, QueryType, QueueRepeatMode } = require("discord-player");

module.exports = {
    name: "np",
    description: "now play",

    async run (client, message, args) {
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
        const player = client.player;
        if (!message.member.voice.channel) return message.channel.send("❌ | **Bạn phải ở trong một kênh nói!**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(":x: | **Bạn phải ở cùng kênh nói với Bot!**"); 

        const queue = player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.channel.send("❌ | Chả có gì đang phát cả!");
        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        return message.channel.send({
            embeds: [
                {
                    title: "Đang phát",
                    description: `🎶 | **${queue.current.title}**! (\`${perc.progress}%\`)`,
                    fields: [
                        {
                            name: "\u200b",
                            value: progress
                        }
                    ],
                    color: 0xffffff
                }
            ]
        });
    }
}