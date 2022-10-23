const { MessageFlags, MessageManager } = require("discord.js");
const Discord = require('discord.js')
const { ActionRowBuilder, ButtonBuilder, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "say",
    description: "Nhắn tin thay bạn",
    options: [
        {
            type: 1,
            name: "1",
            description: "Nhắn tin thay bạn tại kênh khác (Có thể ở Server khác miễn là bạn có quyền)",
            options: [
                {
                    name: "idc",
                    type: 3,
                    description: "ID Kênh bạn muốn gửi tin",
                    required: true
                },
                {
                    name: "text",
                    type: 3,
                    description: "Nội dung tin nhắn",
                    required: true
                }
            ]
        },
        {
            type: 1,
            name: "0",
            description: "Nhắn tin thay bạn tại kênh hiện tại",
            options: [
                {
                    name: "text",
                    type: 3,
                    description: "Nội dung tin nhắn",
                    required: true
                }
            ]
        },
    ],

    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
    async run (client, interaction, option) {
        if (interaction.options.getSubcommand() === "0") {
            if (interaction.channel.permissionsFor(interaction.user.id).has("MANAGE_MESSAGES")) {
                console.log(option)
                const txt = option[0].options[0].value;
                try {
                    interaction.channel.send(txt)
						.then(interaction.reply({content: '**DONE!**', ephemeral: true}))
						.catch(interaction.reply({content: 'Bot không thể gửi tin nhắn đấy vào kênh này', ephemeral: true}));
                } catch {
                    interaction.reply({content: 'Bot không thể gửi tin nhắn đấy vào kênh này', ephemeral: true})
                }
            } else interaction.reply({content: 'Bạn không đủ quyền để thực hiện lệnh này', ephemeral: true})
        } else {
                const channelId = option[0].options[0].value
                const msgr = option[0].options[1].value
                if (isNaN(Number(channelId))) return interaction.reply({content: 'Vui lòng nhập đúng giá trị cấu hình', ephemeral: true});
                try {
                    const channelneed = await client.channels.cache.get(channelId);
                    if (channelneed.permissionsFor(interaction.user.id).has("MANAGE_MESSAGES")) {
                        channelneed.send(msgr)
                            .then(interaction.reply(`**Đã gửi tin nhắn đến \`${channelneed.name}\`!**`))
                            .catch(interaction.reply({content: 'Bot không thể gửi tin nhắn đấy vào kênh này. Có thể là do Bot không có quyền hoặc không có mặt tại kênh này.', ephemeral: true}))
                } else interaction.reply({content: 'Bạn không đủ quyền để thực hiện lệnh này', ephemeral: true});
            } catch {interaction.reply({content: "Bạn hoặc Bot không ở máy chủ đó hoặc Bot không thể truy cập kênh đó hoặc Bot không thể gửi được tin nhắn đấy ở đó.", ephemeral: true})}
        }
    }
}
