const Discord = require('discord.js')

module.exports = {
    name: "queue",
    description: "queue track",
    aliases: ["q", "np"],

    async run(client, message, args) {


        //if (!message.member.voice.channel) return message.reply(`${client.emotes.error} | Bạn phải ở trong một kênh nói`);
        //if (message.guild.members.me.voice.channel && message.member.voice.channel.id !== message.guild.members.me.voice.channel.id) return message.reply(`${client.emotes.error} | Bạn phải ở cùng kênh nói với Bot`); 

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
        const exampleEmbed = new Discord.EmbedBuilder()
        .setColor('White')
        .setTitle(`${client.emotes.queue} | Danh sách chờ`)
        .setDescription(`${q}`)
        .addFields([
            {name: 'Tổng thời gian', value: `${queue.formattedDuration}`, inline: true},
            {name: 'Âm lượng', value: `${queue.volume}%`, inline: true},
            {name: 'Filter', value:`\`${queue.filters.collection.size === 0 ? "Tắt" : queue.filters.collection.join(", ")}\``, inline: true},
            {name: 'Tự động phát', value: `${queue.autoplay ? "Bật" : "Tắt"}`, inline: true},
            {name: 'Lặp', value: `${queue.repeatMode ? queue.repeatMode === 2 ? "Tất cả" : "Đơn bài" : "Tắt"}`, inline: true},
            {name: 'Chủ Hàng đợi', value: `${queue.owner}`, inline: true},
            {name: 'Danh sách Cho phép', value: allowList, inline: true},
        ])
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