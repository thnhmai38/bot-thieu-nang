module.exports = {
    name: "play",
    description: "play music",

    async run (client, message, args){
    console.log(`${message.createdAt} | ${message.author.tag} ${message.author} : ${message}`)
    if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Bạn không ở trong một kênh thoại !`);

    if (!args[0]) return message.channel.send(`${client.emotes.error} - Mình chả biết phát gì cả !`);

    client.player.play(message, args.join(" "));
    }
};
