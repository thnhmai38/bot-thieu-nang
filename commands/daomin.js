const Minesweeper = require('discord.js-minesweeper');
const Discord = require('discord.js')

function isNaturalNumber(n) {
    n = n.toString(); // force the value incase it is not
    var n1 = Math.abs(n),
        n2 = parseInt(n, 10);
    return !isNaN(n1) && n2 === n1 && n1.toString() === n;
}

module.exports = {
    name: "daomin",
    description: "Choi dao min",

    async run(client, message, args) {
        if (!args[0]) {
            message.reply("*Đang khởi tạo Đào mìn 9x9, số lượng mìn 10...*").then((msg) => {
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
                    .setFooter({text: `Tạo bởi ${message.author.tag}`, iconURL: message.author.displayAvatarURL({
                        dynamic: true
                    })});
                msg.edit({
                    embeds: [embed],
                    content: "*Đã tạo xong*"
                });
            })
        } else if (!args[2] || !isNaturalNumber(args[0]) || !isNaturalNumber(args[1]) || !isNaturalNumber(args[2]) || args[0] == `0` || args[1] == `0` || args[2] == `0` || Number(args[0]) * Number(args[1]) <= Number(args[2])) {
            message.reply(`Vui lòng bỏ hoặc nhập chính xác giá trị tùy chỉnh`)
        } else {
            let row = Number(args[0])
            let col = Number(args[1])
            let mine = Number(args[2])
            message.reply(`*Đang khởi tạo Đào mìn ${row}x${col}, số lượng mìn ${mine}...*`).then((msg) => {
                const minesweeper = new Minesweeper({
                    rows: row,
                    columns: col,
                    mines: mine,
                    emote: 'boom',
                    returnType: 'emoji',
                })
                const ms = minesweeper.start().toString();
                if (ms == null) {
                    msg.edit({
                        content: `Không thể khởi tạo Đào mìn ${row}x${col}, số lượng mìn ${mine}`
                    })
                } else {
                        let embed = new Discord.EmbedBuilder({
                            color: "Random",
                            title: `Đào mìn ${row}x${col}, số lượng mìn ${mine}`,
                            description: ms,
                            footer: {
                                text: `Tạo bởi ${message.author.tag}`,
                                iconURL: message.author.displayAvatarURL({
                                    dynamic: true
                                })
                            }
                        })
                        embed.setTimestamp();
                        try {
                            if (embed.length>6000) return msg.edit(`Hoa hết cả mắt :face_with_spiral_eyes:`);
                            msg.edit({
                                embeds: [embed],
                                content: "*Đã tạo xong*"
                            });
                    } catch {
                        msg.edit(`Hoa hết cả mắt :face_with_spiral_eyes:`)
                    }
                }
            })
        }
    }
}