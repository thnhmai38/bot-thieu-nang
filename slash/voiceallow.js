const Discord = require('discord.js')
const { ActionRowBuilder, ButtonBuilder, Client, CommandInteraction } = require("discord.js");
module.exports = {
    name: "voiceallow",
    description: "Hệ thống cho phép (Người trong danh sách có thể />stop, />skip)",
    options: [
        {
            name: "add",
            type: 1,
            description: "Thêm người dùng vào danh sách cho phép",
            options: [
                {
                    name: "user",
                    type: 6,
                    description: "Người dùng bạn muốn cho phép",
                    required: true
                },
            ]
        },
        {
        name: "remove",
            type: 1,
            description: "Xóa người dùng khỏi danh sách cho phép",
            options: [
                {
                    name: "user",
                    type: 6,
                    description: "Người dùng bạn muốn loại bỏ khỏi danh sách",
                    required: true
                },
            ]
        },
        {
            name: "list",
            type: 1,
            description: "Xem danh sách cho phép",
        },
        {
            name: "claim",
            type: 1,
            description: "Lấy quyền Chủ hàng đợi",
        }
    ],

    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
    async run (client, interaction, option) {
        if (!interaction.member.voice.channel) return interaction.reply({content: `${client.emotes.error} |  Bạn phải ở trong một kênh nói`, ephemeral: true});
        if (interaction.guild.members.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.members.me.voice.channel.id) return interaction.reply({content: `${client.emotes.error} |  Bạn phải ở cùng kênh nói với Bot`, ephemeral: true}); 

        var queue = client.distube.getQueue(interaction)
        if (!queue) return interaction.reply({content: `${client.emotes.error} | Chưa có hàng chờ nào được tạo trong máy chủ`, ephemeral: true})
        var owner = false;
        var allowed = false;
        var on = queue.isAllowSystemOn;
        if (interaction.user.id === queue.owner.id) {owner = true;}
        if (owner == true || queue.allowList.includes(interaction.user.id)) {allowed = true;}

        switch (interaction.options.getSubcommand()) {
            case "add": // />voiceallow add <user>
                if (owner) {
                    let user = await interaction.guild.members.cache.get(option[0].options[0].value);
                    let userid = option[0].options[0].value;
                    if (user.user.bot) return interaction.reply({content: `${client.emotes.error} | Họ không thể là Bot`, ephemeral: true});
                    if (userid === interaction.user.id) return interaction.reply({content: `${client.emotes.error} | Bạn không thể tự thêm chính mình`, ephemeral: true})
                    if (queue.allowList.includes(userid)) return interaction.reply({content: `${client.emotes.error} | Người này đã được thêm vào rồi`, ephemeral: true});
                    if (user.voice.channel.id !== interaction.guild.members.me.voice.channel.id) return interaction.reply({content: `${client.emotes.error} | Người này không ở trong kênh nói này`, ephemeral: true});
                    queue.allowList.push(userid);
                    interaction.reply(`${client.emotes.success} | Đã thêm \`${user.user.username}\` vào danh sách Cho phép`);
                } else interaction.reply({content: `${client.emotes.error} | Chỉ Chủ Hàng đợi mới có thể sử dụng lệnh này`, ephemeral: true})
                break;
            case "remove": // />voiceallow remove <user>
                if (owner) {
                    let user = await interaction.guild.members.cache.get(option[0].options[0].value);
                    let userid = option[0].options[0].value;
                    if (user.user.bot) return interaction.reply({content: `${client.emotes.error} | Họ không thể là Bot`, ephemeral: true});
                    if (!queue.allowList.includes(userid)) return interaction.reply({content: `${client.emotes.error} | Người này không có trong danh sách Cho phép`, ephemeral: true});
                    queue.allowList.splice(queue.allowList.indexOf(userid), 1);
                    interaction.reply(`${client.emotes.success} | Đã loại bỏ \`${user.user.username}\` khỏi danh sách Cho phép`);
                } else interaction.reply({content: `${client.emotes.error} | Chỉ Chủ Hàng đợi mới có thể sử dụng lệnh này`, ephemeral: true})
                break;  
            case "list": 
                const allowList = queue.allowList.length==0 ? `***Không có ai***` : queue.allowList.map((value) => `<@${value}>`).join(", ");
                const Embed = new Discord.EmbedBuilder()
                    .setColor('Blue')
                    .setTitle(`${client.emotes.queue} | Danh sách Cho Phép`)
                    .setDescription('Chủ Hàng chờ: <@'+ queue.owner +'>')
                    .addFields([{name: 'Danh sách', value: `${allowList}`}])
                    .setThumbnail(queue.songs[0].thumbnail)
                    .setTimestamp()
                interaction.reply({
                    embeds: [Embed]
                });
                break;
            case "claim":
                if (interaction.user.id === queue.owner.id) return interaction.reply({content: `${client.emotes.error} | Bạn đã là chủ hàng đợi rồi :sweat_smile:`, ephemeral: true})
                let user = interaction.guild.members.cache.get(queue.owner.id);
                if (user.voice.channelId !== interaction.guild.members.me.voice.channel.id) {
                    if (queue.allowList.includes(interaction.user.id)) {queue.allowList.splice(queue.allowList.indexOf(interaction.user.id), 1);}
                    interaction.reply(`${client.emotes.success} | Bạn đã lấy được quyền Chủ hàng đợi thành công từ **\`${queue.owner.username}\`**`)
                    queue.owner = interaction.user;
                    interaction.channel.send(`${client.emotes.queue} | **Chủ hàng đợi mới sẽ là ${interaction.user}**`)
                } else interaction.reply({content: `${client.emotes.error} | Chủ hàng đợi vẫn còn đây, bạn không thể lấy được :angry:`, ephemeral: true})
                break; 
            default:
                break;
            }
    }
}