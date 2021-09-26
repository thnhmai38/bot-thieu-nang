module.exports = {
    name: "volume",
    description: "change volume",

    async run (client, message, args){
    console.log(`${message.createdAt} | ${message.author.tag} ${message.author} : ${message}`)
    if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Bạn không ở trong một kênh thoại !`);

    if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - Chẳng có gì đang phát cả !`);

    if (!args[0]) return message.channel.send(`${client.emotes.error} - Vui lòng nhập một số !`);

    if (isNaN(args[0]) || 100 < args[0] || args[0] <= 0) return message.channel.send(`${client.emotes.error} - Vui lòng nhập giá trị trong khoảng 1 đến 100) !`);

    if (message.content.includes('-') || message.content.includes('+') || message.content.includes(',') || message.content.includes('.')) return message.channel.send(`${client.emotes.error} - Vui lòng nhập chính xác một giá trị !`);

    client.player.setVolume(message, parseInt(args[0]));

    message.channel.send(`${client.emotes.success} - Chỉnh âm lượng thành **${args.join(" ")}%** !`);
    }
};
