module.exports = (client, message, queue, track) => {

    message.channel.send(`${client.emotes.music} - Đã thêm ${track.title} !`);

};