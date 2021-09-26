module.exports = {
    name: "clear-queue",
    description: "clear queue",

    async run (client, message, args){
    console.log(`${message.createdAt} | ${message.author.tag} ${message.author} : ${message}`)

    if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Bạn không ở trong một kênh thoại !`);

    if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - Chẳng có gì đang phát cả !`);

    client.player.clearQueue(message);

    message.channel.send(`${client.emotes.success} - Các bài nhạc chuẩn bị phát trong danh sách phát **đã bị xóa** !`);
    }
};
