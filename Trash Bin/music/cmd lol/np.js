module.exports = {
    name: "np",
    description: "nowplay music",

    async run (client, message, args){
    console.log(`${message.createdAt} | ${message.author.tag} ${message.author} : ${message}`)

    if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Bạn không ở trong một kênh thoại ! !`);

    if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - Chẳng có gì đang phát cả ! !`);

    const track = await client.player.nowPlaying(message);
    const filters = [];

    Object.keys(client.player.getQueue(message).filters).forEach((filterName) => {
        if (client.player.getQueue(message).filters[filterName]) filters.push(filterName);
    });

    message.channel.send({
        embed: {
            color: 'RED',
            author: { name: track.title },
            fields: [
                { name: 'Kênh', value: track.author, inline: true },
                { name: 'Thêm bởi', value: track.requestedBy.username, inline: true },
                { name: 'Từ Danh sách phát', value: track.fromPlaylist ? 'Yes' : 'No', inline: true },

                { name: 'Lượt xem', value: track.views, inline: true },
                { name: 'Độ dài', value: track.duration, inline: true },
                { name: 'Chế độ Lọc', value: filters.length, inline: true },

                { name: 'Tiến trình', value: client.player.createProgressBar(message, { timecodes: true }), inline: true }
            ],
            thumbnail: { url: track.thumbnail },
            timestamp: new Date(),
        },
    });
    }
};
