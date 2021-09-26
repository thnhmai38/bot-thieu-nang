const Discord = require('discord.js');
module.exports = (client, message, query, tracks) => {

    const content = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setAuthor(`Đây là kết quả cho ${query}`)
        .setDescription(`${tracks.map((t, i) => `**${i + 1}** - ${t.title}`).join('\n')}`)
        .setFooter(`Chat số thứ tự tương ứng với bản nhạc muốn chọn để nghe nhạc`)
        .setTimestamp()
    message.channel.send({embeds: [content]});
};