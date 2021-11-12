const { MessageFlags, MessageManager } = require("discord.js");
const Discord = require('discord.js')
const { MessageActionRow, MessageButton, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "say",
    description: "Nhắn tin thay bạn",
    options: [
        {
            type: 1,
            name: "1",
            description: "Nhắn tin thay bạn tại kênh khác",
            options: [
                {
                    name: "idg",
                    type: 3,
                    description: "ID máy chủ bạn muốn gửi tin",
                    required: true
                },
                {
                    name: "idc",
                    type: 3,
                    description: "ID Kênh thoại bạn muốn gửi tin",
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
            if (interaction.member.permissions.has("MANAGE_MESSAGES")) {
                console.log(option)
                const txt = option[0].options[0].value;
                try {
                    interaction.channel.send(txt)
                    interaction.reply({content: '**DONE!**', ephemeral: true});
                } catch {
                    interaction.reply({content: 'Bot không thể gửi tin nhắn đấy vào kênh này', ephemeral: true})
                }
            } else interaction.reply({content: 'BẠN KHÔNG ĐỦ THẨM QUYỀN ĐỂ THỰC HIỆN LỆNH NÀY', ephemeral: true})
        } else {
                const guild = option[0].options[0].value
                const channelId = option[0].options[1].value
                const msgr = option[0].options[2].value
                const userId = interaction.user.id;
                if (isNaN(Number(guild)) || isNaN(Number(channelId))) return interaction.reply({content: 'Vui lòng nhập đúng giá trị cấu hình', ephemeral: true});
                try {
                    const guild2 = await client.guilds.fetch(guild)
                    const guild2Member = await guild2.members.fetch(userId)
                    if (guild2Member.permissions.has("MANAGE_MESSAGES")) {
                        client.channels.cache.get(channelId).send(msgr);
                        interaction.reply("**DONE!**")
                } else interaction.reply({content: 'BẠN KHÔNG ĐỦ THẨM QUYỀN ĐỂ THỰC HIỆN LỆNH NÀY', ephemeral: true});
            } catch {interaction.reply({content: "Bạn hoặc Bot không ở máy chủ đó hoặc Bot không thể truy cập kênh đó hoặc Bot không thể gửi được tin nhắn đấy ở đó.", ephemeral: true})}
        }
    }
}
