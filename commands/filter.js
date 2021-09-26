const Discord = require('discord.js')
const { Player, QueryType, QueueRepeatMode } = require("discord-player");
const mode = ["bassboost_low","bassboost","bassboost_high","vaporwave","nightcore","phaser","tremolo","vibrato","reverse","treble","normalizer","normalizer2","surrounding","pulsator","subboost","kakaoke","flanger","gate","haas","mcompand","mono","mstlr","mstrr","compressor","expander","softlimiter","chorus","chorus2d","chorus3d","fadein","dim","earrape"]
module.exports = {
    name: "filter",
    description: "filter",

    async run (client, message, args) {
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
        const player = client.player;
        if (!message.member.voice.channel) return message.channel.send("❌ | **Bạn phải ở trong một kênh nói!**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(":x: | **Bạn phải ở cùng kênh nói với Bot!**"); 

        const queue = player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.channel.send("❌ | Chả có gì đang phát cả!");
        if (!mode.includes(args[0])) return message.channel.send("❌ | Không rõ Mode");
        var dem = mode.indexOf(args[0]);
        if (args[0]) {
            await queue.setFilters({
                [mode[dem]]: !queue.getFiltersEnabled().includes(args[0])
            });
        }

        return message.channel.send(`🎵 | **${args[0]} ${queue.getFiltersEnabled().includes(args[0]) ? "Bật" : "Tắt"}!** 
        Vui lòng đợi một lúc để load filter...`);
    }
}