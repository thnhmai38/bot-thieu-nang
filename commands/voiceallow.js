const Discord = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, Message, Client } = require('discord.js');

module.exports = {
    name: "voiceallow",
    description: "Allow Voice System v1",

    /**
    *
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    async run (client, message, args) {
        if (!message.member.voice.channel) return message.reply(`${client.emotes.error} | Bạn phải ở trong một kênh nói`);
        if (message.guild.members.me.voice.channel && message.member.voice.channel.id !== message.guild.members.me.voice.channel.id) return message.reply(`${client.emotes.error} | Bạn phải ở cùng kênh nói với Bot`); 

        var queue = client.distube.getQueue(message);
        if (!queue) return message.reply(`${client.emotes.error} | Chưa có hàng chờ nào được tạo trong máy chủ`);
        var owner = false;
        var allowed = false;
        var on = queue.isAllowSystemOn;
        if (message.author.id === queue.owner.id) {owner = true;}
        if (owner == true || queue.allowList.includes(message.author.id)) {allowed = true;}
        /*======================*/
        switch (args[0]) {
            case "add": // />voiceallow add <user>
                if (owner) {
                    let user = message.mentions.users.first();
                    if (user.bot) return message.reply({content: `${client.emotes.error} | Họ không thể là Bot`, ephemeral: true});
                    if (!user) return message.reply(`${client.emotes.error} | Không có người nào được thêm cả`)
                    if (user.id === message.author.id) return message.reply(`${client.emotes.error} | Bạn không thể tự thêm chính mình`)
                    if (queue.allowList.includes(user.id)) return message.reply(`${client.emotes.error} | Người này đã được thêm vào rồi`);
                    let user_guild = await message.guild.members.cache.get(user.id);
                    if (user_guild.voice.channel.id !== message.guild.members.me.voice.channel.id) return message.reply(`${client.emotes.error} | Người này không ở trong kênh nói này`);
                    queue.allowList.push(user.id);
                    message.reply(`${client.emotes.success} | Đã thêm \`${user.username}\` vào danh sách Cho phép`);
                } else message.reply(`${client.emotes.error} | Chỉ Chủ Hàng đợi mới có thể sử dụng lệnh này`)
                break;
            case "remove": // />voiceallow remove <user>
                if (owner) {
                    let user = message.mentions.users.first();
                    if (user.bot) return message.reply({content: `${client.emotes.error} | Họ không thể là Bot`, ephemeral: true});
                    if (!user) return message.reply(`${client.emotes.error} | Không có người nào bị xóa cả`)
                    if (!queue.allowList.includes(user.id)) return message.reply(`${client.emotes.error} | Người này không có trong danh sách Cho phép`);
                    queue.allowList.splice(queue.allowList.indexOf(user.id), 1);
                    message.reply(`${client.emotes.success} | Đã loại bỏ \`${user.username}\` khỏi danh sách Cho phép`);
                } else message.reply(`${client.emotes.error} | Chỉ Chủ Hàng đợi mới có thể sử dụng lệnh này`)
                break;  
            case "list": 
                let allowList = queue.allowList.length==0 ? `***Không có ai***` : queue.allowList.map((value) => `<@${value}>`).join(", ");
                let Embed = new Discord.EmbedBuilder()
                    .setColor('Blue')
                    .setTitle(`${client.emotes.queue} | Danh sách Cho Phép`)
                    .setDescription(`Chủ Hàng chờ: ${queue.owner}\nAllowList hiện đang ${(queue.isAllowListEnabled) ? "**BẬT**" : "**TẮT**"}`)
                    .addFields([{name:'Danh sách', value:`${allowList}`}])
                    .setThumbnail(queue.songs[0].thumbnail)
                    .setTimestamp()
                message.reply({
                    embeds: [Embed]
                });
                break;
            case "claim":
                if (message.author.id === queue.owner.id) return message.reply(`${client.emotes.error} | Bạn đã là chủ hàng đợi rồi :sweat_smile:`)
                let user = message.guild.members.cache.get(queue.owner.id);
                if (user.voice.channelId !== message.guild.members.me.voice.channel.id) {
                    if (queue.allowList.includes(message.author.id)) {queue.allowList.splice(queue.allowList.indexOf(message.author.id), 1);}
                    message.reply(`${client.emotes.success} | Bạn đã lấy được quyền Chủ hàng đợi thành công từ **\`${queue.owner.username}\`**`)
                    queue.owner = message.author;
                    message.channel.send(`${client.emotes.queue} | **Chủ hàng đợi mới sẽ là ${message.author}**`)
                } else message.reply(`${client.emotes.error} | Chủ hàng đợi vẫn còn đây, bạn không thể lấy được :angry:`)
                break; 
            case "off":
                if (owner) {
                    queue.isAllowListEnabled = false;
                    message.reply(`${client.emotes.success} | Bạn đã **TẮT** Danh sách cho phép`)
                } else message.reply(`${client.emotes.error} | Chỉ Chủ Hàng đợi mới có thể sử dụng lệnh này`);
                break;
            case "on":
                if (owner) {
                    queue.isAllowListEnabled = true;
                    message.reply(`${client.emotes.success} | Bạn đã **BẬT** Danh sách cho phép`)
                } else message.reply(`${client.emotes.error} | Chỉ Chủ Hàng đợi mới có thể sử dụng lệnh này`);
                break;
            default:
                message.reply(`${client.emotes.error} | Cú pháp không chính xác. \`/>help\` để biết cách sử dụng.`);
                break;
        }
    }
}