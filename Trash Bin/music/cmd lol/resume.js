module.exports = {
    name: "resume",
    description: "resume music",

    async run (client, message, args){
    console.log(`${message.createdAt} | ${message.author.tag} ${message.author} : ${message}`)
    if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Bạn không ở trong một kênh thoại !`);

    if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - Chẳng có gì đang phát cả !`);

    client.player.resume(message);
    client.player.pause(message);
    client.player.resume(message);

    message.channel.send(`${client.emotes.success} - **Tiếp tục phát** ${client.player.getQueue(message).playing.title} !`);
    }
};
//g