const Discord = require("discord.js");
const {
	ActionRowBuilder,
	ButtonBuilder,
	Client,
	ButtonStyle,
	ComponentType,
    Message
} = require("discord.js");

module.exports = {
	name: "tictactoe",
	description: "Chơi TicTacToe",
	/**
	*
	* @param {Client} client
    * @param {Message} message
    * @param {String[]} args
	*/
	async run(client, message, args) {
		var player1 = message.author;
		var player2 = message.mentions.users.first();
        if (!player2) return message.reply({content: `Bạn định chơi môt mình sao?`, ephemeral: true})
		if (player1.id === player2.id) return message.reply({content: `TicTacToe | **${player1} -VS- ${player2}** và cuối cùng ${player1} thắng...?!?`, ephemeral: true})
		if (player1.bot || player2.bot) return message.reply({content: `Bạn định chơi với máy sao?`, ephemeral: true})
		var player = Math.round(1 + Math.random() * (2 - 1)) === 1 ? player1 : player2;
		const time = 30; //s
		var embed = new Discord.EmbedBuilder()
			.setColor("#075FFF")
			.setTitle(`TicTacToe | Lượt của  ${player.id===player1.id ? "❌" : "⭕"} ${player.username}`)
			.setDescription(
				`**❌ ${player1}  -VS-  ⭕ ${player2}**\nBạn có \`${time}s\` để chọn ô`
			)
			.setFooter({ text: `Đến lượt ${player.username}` })
			.setTimestamp()
			.setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Tic_tac_toe.svg/800px-Tic_tac_toe.svg.png")
		var board = ["➖", "➖", "➖", "➖", "➖", "➖", "➖", "➖", "➖"];
        var OTrong = 9;
		var hang1, hang2, hang3;
		hang1 = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId("01")
				.setLabel(board[0])
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId("02")
				.setLabel(board[1])
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId("03")
				.setLabel(board[2])
				.setStyle(ButtonStyle.Secondary)
		);
		hang2 = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId("04")
				.setLabel(board[3])
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId("05")
				.setLabel(board[4])
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId("06")
				.setLabel(board[5])
				.setStyle(ButtonStyle.Secondary)
		);
		hang3 = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId("07")
				.setLabel(board[6])
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId("08")
				.setLabel(board[7])
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId("09")
				.setLabel(board[8])
				.setStyle(ButtonStyle.Secondary)
		);
		var msg = await message.reply(
			{embeds: [embed], components: [hang1, hang2, hang3]}
		);
		const choose = (luachon) => {
			switch (luachon) {
				case "01":
					return 0;
					break;
				case "02":
					return 1;
					break;
				case "03":
					return 2;
					break;
				case "04":
					return 3;
					break;
				case "05":
					return 4;
					break;
				case "06":
					return 5;
					break;
				case "07":
					return 6;
					break;
				case "08":
					return 7;
					break;
				case "09":
					return 8;
					break;
				default:
					break;
			}
		};
        const choosed = (value) => {return (value==="➖") ? false : true}
		const change = (pos) => {
            let postition = choose(pos);
            board[postition] = (player.id === player1.id) ? "❌" : "⭕";
            OTrong--;
			if (postition <= 2) {
				hang1 = new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setCustomId("01")
						.setLabel(board[0])
						.setStyle(ButtonStyle.Secondary)
                        .setDisabled(choosed(board[0])),
					new ButtonBuilder()
						.setCustomId("02")
						.setLabel(board[1])
						.setStyle(ButtonStyle.Secondary)
                        .setDisabled(choosed(board[1])),
					new ButtonBuilder()
						.setCustomId("03")
						.setLabel(board[2])
						.setStyle(ButtonStyle.Secondary)
                        .setDisabled(choosed(board[2])),
				);
			} else if (postition <= 5) {
				hang2 = new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setCustomId("04")
						.setLabel(board[3])
						.setStyle(ButtonStyle.Secondary)
                        .setDisabled(choosed(board[3])),
					new ButtonBuilder()
						.setCustomId("05")
						.setLabel(board[4])
						.setStyle(ButtonStyle.Secondary)
                        .setDisabled(choosed(board[4])),
					new ButtonBuilder()
						.setCustomId("06")
						.setLabel(board[5])
						.setStyle(ButtonStyle.Secondary)
                        .setDisabled(choosed(board[5])),
				);
			} else {
				hang3 = new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setCustomId("07")
						.setLabel(board[6])
						.setStyle(ButtonStyle.Secondary)
                        .setDisabled(choosed(board[6])),
					new ButtonBuilder()
						.setCustomId("08")
						.setLabel(board[7])
						.setStyle(ButtonStyle.Secondary)
                        .setDisabled(choosed(board[7])),
					new ButtonBuilder()
						.setCustomId("09")
						.setLabel(board[8])
						.setStyle(ButtonStyle.Secondary)
                        .setDisabled(choosed(board[8])),
				);
            }
		};
        const Tie = () => {
            embed 
                .setTitle(`TicTacToe | HÒA!`)
                .setDescription(
                    `**❌ ${player1}  -VS-  ⭕ ${player2}**`
                )
                .setFooter({text: `Trò chơi đã kết thúc! Hòa do kín hết ô`})
                .setTimestamp();
            msg.edit({embeds: [embed], components: [hang1, hang2, hang3]});
        }
        const SSB = (v1, v2, v3) => {return (board[v1-1]===board[v2-1]) && (board[v2-1]===board[v3-1]);}
        const FindWinner = () => {
            if (choosed(board[0]) && (SSB(1, 2, 3) || SSB(1, 5, 9) || SSB(1, 4, 7))) {return board[0];}
			else if (choosed(board[2]) && (SSB(3, 5, 7) || SSB(3, 6, 9))) {return board[2];} 
			else if (choosed(board[8]) && SSB(7, 8, 9)) {return board[8];} 
			else if (choosed(board[4]) && (SSB(2, 8, 5) || SSB(4, 5, 6))) {return board[4];}
            return -1;
        }
        const TheWinner = () => {
            let syntax = FindWinner(); 
            if (syntax===-1) return -1;
            return (syntax === "❌" ? player1 : player2)
        }
		const FillButtonWhenWin = () => {
			let button = [ButtonStyle.Secondary, ButtonStyle.Secondary, ButtonStyle.Secondary, ButtonStyle.Secondary, ButtonStyle.Secondary, ButtonStyle.Secondary, ButtonStyle.Secondary, ButtonStyle.Secondary, ButtonStyle.Secondary];
			const changeButton = (v1, v2, v3) => {
				button[v1-1] = ButtonStyle.Success;
				button[v2-1] = ButtonStyle.Success;
				button[v3-1] = ButtonStyle.Success;
			}
			if (choosed(board[0]) && (SSB(1, 2, 3))) {changeButton(1, 2, 3)}
			else if (choosed(board[0]) && SSB(1, 5, 9)) {changeButton(1, 5, 9)}
			else if (choosed(board[0]) && SSB(1, 4, 7)) {changeButton(1, 4, 7)}
			else if (choosed(board[2]) && (SSB(3, 5, 7))) {changeButton(3, 5, 7)}
			else if (choosed(board[2]) && SSB(3, 6, 9)) {changeButton(3, 6, 9)}
			else if (choosed(board[8]) && SSB(8, 9, 7)) {changeButton(8, 9, 7)}
			else if (choosed(board[4]) && SSB(2, 8, 5)) {changeButton(2, 8, 5)}
			else if (choosed(board[4]) && SSB(5, 4, 6)) {changeButton(5, 4, 6)}

			hang1 = new ActionRowBuilder().addComponents(
				new ButtonBuilder()
					.setCustomId("01")
					.setLabel(board[0])
					.setStyle(button[0])
					.setDisabled(true),
				new ButtonBuilder()
					.setCustomId("02")
					.setLabel(board[1])
					.setStyle(button[1])
					.setDisabled(true),
				new ButtonBuilder()
					.setCustomId("03")
					.setLabel(board[2])
					.setStyle(button[2])
					.setDisabled(true))
			hang2 = new ActionRowBuilder().addComponents(
				new ButtonBuilder()
					.setCustomId("04")
					.setLabel(board[3])
					.setStyle(button[3])
					.setDisabled(true),
				new ButtonBuilder()
					.setCustomId("05")
					.setLabel(board[4])
					.setStyle(button[4])
					.setDisabled(true),
				new ButtonBuilder()
					.setCustomId("06")
					.setLabel(board[5])
					.setStyle(button[5])
					.setDisabled(true))
			hang3 = new ActionRowBuilder().addComponents(
				new ButtonBuilder()
					.setCustomId("07")
					.setLabel(board[6])
					.setStyle(button[6])
					.setDisabled(true),
				new ButtonBuilder()
					.setCustomId("08")
					.setLabel(board[7])
					.setStyle(button[7])
					.setDisabled(true),
				new ButtonBuilder()
					.setCustomId("09")
					.setLabel(board[8])
					.setStyle(button[8])
					.setDisabled(true))
		}
        const Win = () => {
			let winner = TheWinner();
            embed 
                .setTitle(`TicTacToe |  ${(winner.id === player1) ? "❌" : "⭕"} ${winner.username} ĐÃ CHIẾN THẮNG!`)
                .setDescription(
                    `**❌ ${player1}  -VS-  ⭕ ${player2}**`
                )
                .setFooter({text: `Trò chơi đã kết thúc! ${winner.username} thắng do ăn ba`})
                .setTimestamp();
			FillButtonWhenWin();
            msg.edit({embeds: [embed], components: [hang1, hang2, hang3]});
        }
		var setTime = () => {
			return setTimeout(() => {
				let winner = (player.id===player1.id) ? player2 : player1;
				embed 
					.setTitle(`TicTacToe |  ${(winner.id === player1) ? "❌" : "⭕"} ${winner.username} ĐÃ CHIẾN THẮNG!`)
					.setDescription(
						`**❌ ${player1}  -VS-  ⭕ ${player2}**`
					)
					.setFooter({text: `Trò chơi đã kết thúc! ${winner.username} thắng do đối phương hết thời gian`})
					.setTimestamp();
				hang1 = new ActionRowBuilder().addComponents(
						new ButtonBuilder()
							.setCustomId("01")
							.setLabel(board[0])
							.setStyle(ButtonStyle.Secondary)
							.setDisabled(true),
						new ButtonBuilder()
							.setCustomId("02")
							.setLabel(board[1])
							.setStyle(ButtonStyle.Secondary)
							.setDisabled(true),
						new ButtonBuilder()
							.setCustomId("03")
							.setLabel(board[2])
							.setStyle(ButtonStyle.Secondary)
						.setDisabled(true))
				hang2 = new ActionRowBuilder().addComponents(
						new ButtonBuilder()
							.setCustomId("04")
							.setLabel(board[3])
							.setStyle(ButtonStyle.Secondary)
							.setDisabled(true),
						new ButtonBuilder()
							.setCustomId("05")
							.setLabel(board[4])
							.setStyle(ButtonStyle.Secondary)
							.setDisabled(true),
						new ButtonBuilder()
							.setCustomId("06")
							.setLabel(board[5])
							.setStyle(ButtonStyle.Secondary)
						.setDisabled(true))
				hang3 = new ActionRowBuilder().addComponents(
						new ButtonBuilder()
							.setCustomId("07")
							.setLabel(board[6])
							.setStyle(ButtonStyle.Secondary)
							.setDisabled(true),
						new ButtonBuilder()
							.setCustomId("08")
							.setLabel(board[7])
							.setStyle(ButtonStyle.Secondary)
							.setDisabled(true),
						new ButtonBuilder()
							.setCustomId("09")
							.setLabel(board[8])
							.setStyle(ButtonStyle.Secondary)
						.setDisabled(true))
				msg.edit(
					{embeds: [embed], components: [hang1, hang2, hang3]}
				);
			}, time*1000);
		};
		var timer;
		var Runner = () => {
            const filter = (interaction) => {
				return (interaction.user.id === player.id)
			}
			let collector = msg.createMessageComponentCollector({componentType: ComponentType.Button, max: 1, time: time*1000, filter});
			collector.on("collect", (i) => {
				i.deferUpdate();
                clearTimeout(timer);
				change(i.customId);
				nextTurn();
            });
			timer = setTime();
			collector.on("ignore", (i) => {
				if (i.user.id !== player1.id && i.user.id !== player2.id) {
					i.reply({content: "Bạn không tham gia trò chơi này!", ephemeral: true})
				} else i.reply({content: "Chưa đến lượt bạn! Hãy chờ đối thủ...", ephemeral: true})
			})
		}
		async function nextTurn() {
			if (FindWinner()!=-1) {return Win();}
			if (OTrong===0) {return Tie();}
			player = (player.id === player1.id) ? player2 : player1;
			embed
				.setTitle(`TicTacToe | Lượt của  ${(player.id === player1.id) ? "❌" : "⭕"} ${player.username}`)
				.setFooter({ text: `Đến lượt ${player.username}` })
				.setTimestamp();
			await msg.edit({ embeds: [embed], components: [hang1, hang2, hang3] });
			Runner();
		};
		Runner();
	},
};
