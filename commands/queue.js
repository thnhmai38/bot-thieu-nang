const Discord = require('discord.js')

module.exports = {
    name: "queue",
    description: "queue track",
    aliases: ["q", "np"],

    async run (client, message, args) {
        

        //if (!message.member.voice.channel) return message.reply(`${client.emotes.error} | Bạn phải ở trong một kênh nói`);
        //if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`${client.emotes.error} | Bạn phải ở cùng kênh nói với Bot`); 
    
        const queue = client.distube.getQueue(message)
        if (!queue) return message.reply(`${client.emotes.error} | Chả có gì đang phát cả`);
        /*/
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
        /*/
        const q = queue.songs.map((song, i) => `${i === 0 ? "**Đang phát:" : `${i}.`} [${song.name}](${song.url}) - \`${song.formattedDuration}\` ${i===0 ? "**" : ""}`).join("\n")
        const status = queue => `Âm lượng: ${queue.volume}% | Bộ lọc: ${queue.filters.length === 0 ? "Tắt" : queue.filters} | Lặp: ${queue.repeatMode ? queue.repeatMode === 2 ? "Tất cả" : "Bài này" : "Tắt"} | Tự động phát: ${queue.autoplay ? "Bật" : "Tắt"}`
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('WHITE')
            .setTitle(`${client.emotes.queue} | Danh sách chờ`)
            .setDescription(`${q}\n\n *Tổng thời gian : ${queue.formattedDuration}*`)
            .setTimestamp()
            .setFooter(status(queue), `https://i.imgur.com/hfTBpOg.gif`);
        message.reply({embeds : [exampleEmbed]});
    }
}