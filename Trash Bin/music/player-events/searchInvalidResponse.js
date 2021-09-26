module.exports = (client, message, query, tracks, content, collector) => {

    message.channel.send(`${client.emotes.error} - Vui lòng chat một giá trị từ **1** đến **${tracks.length}** !`);

};