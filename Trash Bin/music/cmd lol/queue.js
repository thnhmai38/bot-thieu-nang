module.exports = {
    name: "queue",
    description: "queue music",

    async run (client, message, args){
    console.log(`${message.createdAt} | ${message.author.tag} ${message.author} : ${message}`)
    if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Bạn không ở trong một kênh thoại !`);

    const queue = client.player.getQueue(message);

    if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - Chẳng có gì đang phát cả !`);

    message.channel.send(`**Máy chủ - ${message.guild.name} ${client.emotes.queue}**\nĐang phát : ${queue.playing.title} | ${queue.playing.author}\n\n` + (queue.tracks.map((track, i) => {
        return `**#${i + 1}** - ${track.title} | ${track.author} ( Thêm bởi : ${track.requestedBy.username})`
    }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `và **${queue.tracks.length - 5}** bản nhạc nữa...` : `Trong danh sách phát có **${queue.tracks.length}** bản nhạc...`}`));
    }
};
