const Discord = require('discord.js')

module.exports = {
    name: "skip",
    description: "skip track",
    inVoiceChannel: true,

    async run (client, message, args) {
        
        
        if (!message.member.voice.channel) return message.reply(`${client.emotes.error} | Bạn phải ở trong một kênh nói`);
        if (message.guild.members.me.voice.channel && message.member.voice.channel.id !== message.guild.members.me.voice.channel.id) return message.reply(`${client.emotes.error} | Bạn phải ở cùng kênh nói với Bot`); 

        const queue = client.distube.getQueue(message)
        if (!queue) return message.reply(`${client.emotes.error} | Chả có gì đang phát cả`)
        const owner = queue.owner;
        function skip(a) {
            try {
                if (queue.songs.length == 1) {
                    queue.stop()
                    message.reply(`${client.emotes.stop} | **Đã dừng nhạc! (${a===1? `Force Skip`: `Voteskip`})**`)
                } else {
                    const song = queue.skip(queue)
                    message.reply(`${client.emotes.success} | **Đã bỏ qua bài nhạc! (${a===1? `Force Skip`: `Voteskip`})**`)
                    if (queue.repeatMode === 2) {
                        message.reply(client.emotes.queue + " | **Đang phát nhạc ở chế độ \"Lặp toàn bộ\", vì vậy bài nhạc này sẽ được phát lại sau.** Thay đổi bằng `/>loop`")
                    }
                }
            } catch (e) {
                message.reply(`${client.emotes.error} | Lỗi : ${e}`)
            }
        }
        if (message.author.id === owner.id || queue.voiceChannel.permissionsFor(message.author.id).has("MUTE_MEMBERS") || queue.voiceChannel.permissionsFor(message.author.id).has("MOVE_MEMBERS") || queue.allowList.includes(message.author.id)) {
            skip(1)
        } else {
            const count = queue.voiceChannel.members.filter(member => !member.user.bot).size;
            if (count < 3) {skip(1)} else 
            {
                const song = queue.songs[0];
                if (!song.voteskip) {song.voteskip = []}; //Tạo mảng
                if (!song.voteskip.includes(message.author.id)) {
                    song.voteskip.push(message.author.id); //Thêm người
                    song.voteskip = Array.from(new Set(song.voteskip)); //Dọn rác
                    message.reply(`${client.emotes.queue} | ${message.author} đã **voteskip** bài hát này *\`(${song.voteskip.length}/${Math.floor(count*0.75)}, ${Math.floor(count*0.75)-song.voteskip.length} nữa để skip)\`*`);
                } else {
                    song.voteskip.splice(song.voteskip.indexOf(message.author.id), 1);
                    message.reply(`${client.emotes.queue} | ${message.author} đã **hủy voteskip** bài hát này *\`(${song.voteskip.length}/${Math.floor(count*0.75)}, ${Math.floor(count*0.75)-song.voteskip.length} nữa để skip)\`*`);
                }
                if (song.voteskip.length>=Math.floor(count*0.75)) {skip(2)}
            }
        }
    }
}