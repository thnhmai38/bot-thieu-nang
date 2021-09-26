module.exports = (client, error, message) => {

    switch (error) {
        case 'NotPlaying':
            message.channel.send(`${client.emotes.error} - Chẳng có gì đang phát cả !`);
            break;
        case 'NotConnected':
            message.channel.send(`${client.emotes.error} - Bạn không ở một kênh thoại nào cả !`);
            break;
        case 'UnableToJoin':
            message.channel.send(`${client.emotes.error} - Vui lòng kiểm tra lại quyền hạn của bot !`);
            break;
        default:
            message.channel.send(`${client.emotes.error} - Có gì đó sai sai ... : ${error}`);
    };

};
