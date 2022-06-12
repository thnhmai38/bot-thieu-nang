const Discord = require('discord.js')

module.exports = {
    name: "queue",
    description: "queue track",
    aliases: ["q", "np"],

    async run(client, message, args) {


        //if (!message.member.voice.channel) return message.reply(`${client.emotes.error} | Bạn phải ở trong một kênh nói`);
        //if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`${client.emotes.error} | Bạn phải ở cùng kênh nói với Bot`); 

        var queue = client.distube.getQueue(message)
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

        const q = queue.songs.map((song, i) => `${i === 0 ? "**Đang phát:" : `${i}.`} [${song.name}](${song.url}) (${song.member}) ${song.age_restricted==true?`(*) `:''}- \`${i === 0 ? queue.formattedCurrentTime + " / " :""}${song.formattedDuration}\` ${i===0 ? "**" : ""}`).join("\n")
        const allowList = queue.allowList.length==0 ? `*Không ai*` : queue.allowList.map((value) => `<@${value}>`).join(", ");
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('WHITE')
        .setTitle(`${client.emotes.queue} | Danh sách chờ`)
        .setDescription(`${q}`)
        .addField('Tổng thời gian', `${queue.formattedDuration}`, true)
        .addField('Âm lượng', `${queue.volume}%`, true)
        .addField('Filter', `\`${queue.filters.length === 0 ? "Tắt" : queue.filters.join(", ")}\``, true)
        .addField('Tự động phát', `${queue.autoplay ? "Bật" : "Tắt"}`, true)
        .addField('Lặp', `${queue.repeatMode ? queue.repeatMode === 2 ? "Tất cả" : "Đơn bài" : "Tắt"}`, true)
        .addField('Chủ Hàng đợi', `${queue.owner}`, true)
        .addField('Danh sách Cho phép', allowList, true)
        .setThumbnail(queue.songs[0].thumbnail)
        .setFooter({
            text: `(*) là Nội dung Giới hạn độ tuổi`
        })
        .setTimestamp()
        message.reply({
            embeds: [exampleEmbed]
        });
    }
}