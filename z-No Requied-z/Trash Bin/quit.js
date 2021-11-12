module.exports = {
    name: 'quit',
    description: 'stop the bot and leave the channel',
    async run (client, message, args) {
        console.log(`${message.createdAt} | ${message.author.tag} ${message.author} : ${message}`)
        const voiceChannel = message.member.voice.channel;
 
        if(!voiceChannel) return message.channel.send("Bạn cần ở trong kênh Bot đang ở để sử dụng lệnh!");
        await voiceChannel.leave();
        await message.channel.send('Đang dừng và thoát kênh... :smiling_face_with_tear:')
 
    }
}