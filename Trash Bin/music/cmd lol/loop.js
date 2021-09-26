module.exports = {
    name: "loop",
    description: "loop music",

    async run (client, message, args){
    console.log(`${message.createdAt} | ${message.author.tag} ${message.author} : ${message}`)

    if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Bạn không ở trong một kênh thoại ! !`);

    if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - Chẳng có gì đang phát cả ! !`);

    const repeatMode = client.player.getQueue(message).repeatMode;

    if (repeatMode) {
        client.player.setRepeatMode(message, false);
        return message.channel.send(`${client.emotes.success} - **Tắt** chế độ lặp lại !`);
    } else {
        client.player.setRepeatMode(message, true);
        return message.channel.send(`${client.emotes.success} - **Bật** chế độ lặp lại !`);
    };
    }
};
