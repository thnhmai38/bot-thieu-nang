module.exports = (client, message, playlist) => {

    message.channel.send(`${client.emotes.music} - ${playlist.title} đã được thêm vào (**${playlist.items.length}** bản nhạc) !`);

};