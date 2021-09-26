module.exports = (client, message, query) => {

    message.channel.send(`${client.emotes.error} - Không có kết quả tìm kiếm Youtube cho ${query} !`);

};