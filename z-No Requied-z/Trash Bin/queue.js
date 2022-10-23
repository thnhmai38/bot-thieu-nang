const Discord = require('discord.js')
const { Player, QueryType, QueueRepeatMode } = require("discord-player");


module.exports = {
    name: "queue",
    description: "queue track",

    async run (client, message, args) {
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
        const player = client.player;
        if (!message.member.voice.channel) return message.channel.send("❌ | **Bạn phải ở trong một kênh nói!**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(":x: | **Bạn phải ở cùng kênh nói với Bot!**"); 
    
        const queue = player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.channel.send("❌ | Chả có gì đang phát cả!");
        const currentTrack = queue.current;
        const tracks = queue.tracks.slice(0, 10).map((m, i) => {
            return `${i + 1}. **${m.title}** ([link](${m.url}))`;
        });
        var giay = queue.totalTime/1000
        var phut = 0;
        var gio = 0;
        if (giay>60) {  
            var phut = (giay - giay%60)/60
            giay = giay-(phut*60)
            if (phut >60) {
                var gio = (phut - phut%60)/60
                phut = phut - gio*60
            }
        }
        if (gio>0) {var giostr = `${gio}h`} else var giostr = ""
        if (phut>0) {var phutstr = `${phut}m`} else var phutstr = ""
        var giaystr = `${giay}s`
        var time = giostr + phutstr + giaystr
        const list = new Discord.EmbedBuilder()
            .setTitle("Hàng đợi")
            .setDescription(`${tracks.join("\n")}${
                queue.tracks.length > tracks.length
                    ? `\n...${queue.tracks.length - tracks.length === 1 ? `${queue.tracks.length - tracks.length} bài nữa` : `${queue.tracks.length - tracks.length} bài nữa`}`
                    : ""
            }`)
            .setColor("Random")
            .addFields(
                { name: "Đang phát", value: `🎶 | **${currentTrack.title}** ([link](${currentTrack.url}))` }
            )
            .setFooter(`Tổng thời gian hàng đợi: ${time}`)
        return message.channel.send({embeds : [list]});
    }
}