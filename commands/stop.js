const Discord = require('discord.js')

module.exports = {
    name: "stop",
    description: "stop",
    aliases: ["disconnect", "leave"],
    inVoiceChannel: true,

    async run(client, message, args) {
        if (!message.member.voice.channel) return message.reply(`${client.emotes.error} | Bạn phải ở trong một kênh nói`);
        if (message.guild.members.me.voice.channel && message.member.voice.channel.id !== message.guild.members.me.voice.channel.id) return message.reply(`${client.emotes.error} | Bạn phải ở cùng kênh nói với Bot`);

        const queue = client.distube.getQueue(message);
        if (!queue) return message.reply(`${client.emotes.error} | Chả có gì đang phát cả`)
        const owner = queue.owner;
        function stop() {
            queue.stop();
            message.reply(`${client.emotes.stop} | Đã dừng nhạc!`)
        }
        if (message.author.id === owner.id || queue.voiceChannel.permissionsFor(message.author.id).has("MUTE_MEMBERS") || queue.voiceChannel.permissionsFor(message.author.id).has("MOVE_MEMBERS") || queue.allowList.includes(message.author.id)) {
            stop();
        } else {
            message.reply(`${client.emotes.error} | Bạn không có đủ quyền hạn để dừng nhạc`);
        }
    }
}