const Discord = require('discord.js');
const ChannelType = Discord.ChannelType;

module.exports = {
    name: "play",
    description: "play songs",


    async run (client, message, args) {

        if (!message.member.voice.channel) return message.reply(`${client.emotes.error} |  Bạn phải ở trong một kênh nói`);
        if (message.guild.members.me.voice.channel && message.member.voice.channel.id !== message.guild.members.me.voice.channel.id) return message.reply(`${client.emotes.error} |  Bạn phải ở cùng kênh nói với Bot`); 
        if (!args.join(' ')) return message.reply(`${client.emotes.error} | Bạn không muốn phát bài gì cả`)
        if (message.member.voice.channel.type == ChannelType.GuildStageVoice && message.member.voice.suppress == true) return message.reply(`${client.emotes.error} | Bạn đang ở trong kênh Sân khấu. Để dùng lệnh này trong kênh sân khấu, bạn phải **ở trên Sân khấu** (trở thành Người nói) trước`)

        try {
            var queue = client.distube.getQueue(message);
            var kt = 0;
            if (!queue) {kt = 1;}
            await client.distube.play(message.member.voice.channel, args.join(' '), { message, member: message.member });
            if (kt===1) {
                const queue = client.distube.getQueue(message);
                if (queue) {
                    queue.owner = message.author;
                    queue.isAllowSystemOn = false;
                    queue.allowList = [];
                    queue.isAllowListEnabled = true;
                    message.reply(`${client.emotes.queue} | **${queue.owner} sẽ là chủ của Hàng đợi**`);
                }
            }
            function loop(client, message) {
                if (message.member.voice.channel.type == ChannelType.GuildStageVoice) {
                    setTimeout(function () {
                        if (client.distube.getQueue(message)) {
                            try {
                                message.guild.members.me.voice.setSuppressed(false)
                            } catch (e) {
                                message.guild.members.me.voice.setRequestToSpeak(true);
                                message.reply(`${client.emotes.success} | Đã gửi **Đề nghị Nói**. \n*Nếu Bot chưa xuất hiện trên Sân khấu, hãy mời Bot lên Sân khấu (trở thành Người nói) ngay để tránh việc nhạc tự phát khi Bot chưa lên Sân khấu*`)
                            };
                            return;
                        } else loop(client, message)
                    }, 2000)
                } else return;
            }
            loop(client, message);
        } catch (e) {
            message.reply(`${client.emotes.error} | Lỗi: **${e}**`)
        }
    }
}