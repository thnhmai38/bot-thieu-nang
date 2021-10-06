const Discord = require('discord.js')
const { Player, QueryType, QueueRepeatMode } = require("discord-player");

module.exports = {
    name: "play",
    description: "play songs",

    async run (client, message, args) {
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
        const player = client.player;
        if (!message.member.voice.channel) return message.channel.send("❌ | **Bạn phải ở trong một kênh nói!**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(":x: | **Bạn phải ở cùng kênh nói với Bot!**"); 

        const searchResult = await player.search(args.join(" "), {
            requestedBy: message.user,
            //searchEngine: QueryType.AUTO
        }).then(x => x.tracks[0]);
        if (!searchResult || !searchResult.tracks.length) {
            return void message.channel.send("❌ | Không tìm thấy nhạc/video hoặc đã xảy ra lỗi khi tìm kiếm");
        }
        //if (!searchResult.playlist && !searchResult.tracks[0]) return message.channel.send("❌ | Không tìm thấy nhạc/video");
        
        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });
        
        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            void player.deleteQueue(message.guildId);
            return void message.channel.send("❌ | Đã xảy ra lỗi khi tham gia kênh nói!");
        }
        
        await message.channel.send(`⏱ | Đang tải ${searchResult.playlist ? "danh sách phát" : "bài nhạc"}...` );
        if (searchResult.playlist) {queue.addTracks(searchResult.tracks)} else {queue.addTrack(searchResult.tracks[0])};
        if (!queue.playing) await queue.play();
    }
}