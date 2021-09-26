module.exports = (client, message, track) => {

    message.channel.send(`${client.emotes.music} - Đang phát ${track.title} trong ${message.member.voice.channel.name} ...`);

};