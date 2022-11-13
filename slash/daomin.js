const Minesweeper = require('discord.js-minesweeper');

function isNaturalNumber(n) {
    n = n.toString(); // force the value incase it is not
    var n1 = Math.abs(n),
        n2 = parseInt(n, 10);
    return !isNaN(n1) && n2 === n1 && n1.toString() === n;
}
const Discord = require('discord.js')
const {
    ActionRowBuilder,
    ButtonBuilder,
    Client,
    CommandInteraction
} = require("discord.js");

module.exports = {
    name: "daomin",
    description: "Khởi tạo Game Đào mìn",
    options: [{
        name: "data",
        type: 3,
        description: "Dữ liệu (<row> <col> <mine>)",
        required: false,
    }],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
     */
    async run(client, interaction, option) {
        try {
            var kt = option[0].value;
        } catch {
            var kt = null;
        }
        if (kt == null) {
            await interaction.reply("*Đang khởi tạo Đào mìn 9x9, số lượng mìn 10...*")
            const minesweeper = new Minesweeper({
                rows: 9,
                columns: 9,
                mines: 10,
                emote: 'boom',
                returnType: 'emoji',
            })
            const data = minesweeper.start().toString();
            const embed = new Discord.EmbedBuilder()
                .setColor('Random')
                .setTitle(`Đào mìn 9x9, số lượng mìn 10`)
                .setDescription(data)
                .setTimestamp()
                .setFooter({
                    text: `Tạo bởi ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true
                    })
                });
            interaction.editReply({
                embeds: [embed],
                content: "*Đã tạo xong*"
            });
        } else {
            var args = option[0].value.split(" ");
            if (!args[2] || !isNaturalNumber(args[0]) || !isNaturalNumber(args[1]) || !isNaturalNumber(args[2]) || args[0] == `0` || args[1] == `0` || args[2] == `0` || Number(args[0]) * Number(args[1]) <= Number(args[2])) {
                interaction.editReply({
                    content: `Vui lòng bỏ hoặc nhập chính xác giá trị tùy chỉnh`,
                    ephemeral: true
                })
            } else {
                let row = Number(args[0])
                let col = Number(args[1])
                let mine = Number(args[2])
                await interaction.reply(`*Đang khởi tạo Đào mìn ${row}x${col}, số lượng mìn ${mine}...*`)
                const minesweeper = new Minesweeper({
                    rows: row,
                    columns: col,
                    mines: mine,
                    emote: 'boom',
                    returnType: 'emoji',
                })
                const ms = minesweeper.start().toString();

                if (ms == null) {
                    interaction.editReply({
                        content: `Không thể khởi tạo Đào mìn ${row}x${col}, số lượng mìn ${mine}`,
                        ephemeral: true
                    })
                } else {
                    let embed = new Discord.EmbedBuilder({
                        color: "Random",
                        title: `Đào mìn ${row}x${col}, số lượng mìn ${mine}`,
                        description: ms,
                        footer: {
                            text: `Tạo bởi ${interaction.user.tag}`,
                            iconURL: interaction.user.displayAvatarURL({
                                dynamic: true
                            })
                        }
                    })
                    embed.setTimestamp();
                    try {
                        if (embed.length > 6000) return interaction.editReply(`Hoa hết cả mắt :face_with_spiral_eyes:`);
                        interaction.editReply({
                            embeds: [embed],
                            content: "*Đã tạo xong*"
                        });
                    } catch {
                        interaction.editReply(`Hoa hết cả mắt :face_with_spiral_eyes:`)
                    }
                }
            }
        }
    }
}