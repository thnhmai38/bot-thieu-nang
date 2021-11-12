const Discord = require('discord.js')

module.exports = {
    name: "play",
    description: "play songs",
    aliases: ["p"],
    inVoiceChannel: true,

    async run (client, message, args) {

        if (!message.member.voice.channel) return message.reply(`${client.emotes.error} |  Bạn phải ở trong một kênh nói`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`${client.emotes.error} |  Bạn phải ở cùng kênh nói với Bot`); 
        if (!args.join(' ')) return message.reply(`${client.emotes.error} | Bạn không muốn phát bài gì cả`)
        if (message.member.voice.channel.type == "GUILD_STAGE_VOICE" && message.member.voice.suppress == true) return message.reply(`${client.emotes.error} | Bạn đang ở trong kênh Sân khấu. Để dùng lệnh này trong kênh sân khấu, bạn phải **ở trên Sân khấu** (trở thành Người nói) trước`)

        try {
            client.distube.play(message, args.join(' '));
            function loop(client, message) {
                if (message.member.voice.channel.type == "GUILD_STAGE_VOICE") {
                    setTimeout(function () {
                        if (client.distube.getQueue(message)) {
                            try {
                                message.guild.me.voice.setSuppressed(false)
                            } catch (e) {
                                message.guild.me.voice.setRequestToSpeak(true);
                                message.reply(`${client.emotes.success} | Đã gửi **Đề nghị Nói**. \n*Nếu Bot chưa xuất hiện trên Sân khấu, hãy mời Bot lên Sân khấu (trở thành Người nói) ngay để tránh việc nhạc phát khi Bot chưa lên Sân khấu*`)
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