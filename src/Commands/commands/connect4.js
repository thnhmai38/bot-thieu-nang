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
    name: "connect4",
    desciption: "chơi connect 4",
    /**
	*
	* @param {Client} client
    * @param {Message} message
    * @param {String[]} args
	*/

    async run(client, message, args) {
        const player1 = message.author;
        const player2 = message.mentions.users.first();
        const time = 60;
        const TieVotetime = 30;
        const DelayTieTime = 60;
        if (!player2) return message.reply({content: "Bạn định chơi một mình sao?"})
        if (player2.bot) return message.reply({content: "Bạn không thể chơi cùng với máy"})
        if (player2.id === player1.id) return message.reply({content: "Bạn không thể chơi với chính mình"})
        var board = [
            ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
            ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
            ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
            ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
            ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
            ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
        ];
        var SoO = 6*7;
        var list = [
            {user: player1, color: "🔴"},
            {user: player2, color: "🟡"}
        ]
        const MissonTitle = "Nhiệm vụ: Thả nút sao cho có 4 ô cùng màu liên tiếp (Ngang, dọc, chéo)";
        var player = Math.round(1 + Math.random() * (2 - 1)) === 1 ? list[0] : list[1];
        var button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("bocuoc")
                .setLabel("Bỏ Cuộc")
                .setEmoji("🏳️")
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId("xinhoa")
                .setLabel("Xin Hòa")
                .setEmoji("🤝")
                .setStyle(ButtonStyle.Primary)
        )
        const renderBoard = () => {
            let bstr = "";
            for (const bs of board) {
                bstr += `${bs.join("")}\n`;
            }

            bstr = bstr.concat("1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣");
            return bstr;
        }
        const titleBattle = () => {
            return `${list[0].color} ${list[0].user} **-VS-** ${list[1].color} ${list[1].user}`
        }
        const turnOf = () => {
            return `**Đang là lượt của ${player.color} ${player.user}**`
        }
        const colorEmbed = () => {
            return ((player.color === "🔴") ? "Red" : "Yellow")
        }



        var embed = new Discord.EmbedBuilder()
            .setColor("Blue")
            .setTitle('Connect Four')
            .setAuthor({name: "Connect Four | Đang chuẩn bị..."})
            .setDescription(`${titleBattle()}\n**Đang chuẩn bị trận đấu...**\n\n${MissonTitle}`)
            .setTimestamp()
            .setFooter({text: `Trận đấu đang được chuẩn bị | Người chơi sẽ có ${time}s để chọn`})
        var msg = await message.reply({embeds: [embed]})
        await msg.react("1️⃣");
        await msg.react("2️⃣");
        await msg.react("3️⃣");
        await msg.react("4️⃣");
        await msg.react("5️⃣");
        await msg.react("6️⃣");
        await msg.react("7️⃣");
        embed = new Discord.EmbedBuilder()
            .setColor(colorEmbed())
            .setTitle('Connect Four')
            .setAuthor({name: "Connect Four | Trận đấu đang diễn ra"})
            .setDescription(`${renderBoard()}\n\n${titleBattle()}\n${turnOf()}\n\n${MissonTitle}`)
            .setTimestamp()
            .setFooter({text: `Trận đấu đang diễn ra | ${player.user.username} có ${time}s để chọn`})
        await msg.edit({embeds: [embed], components: [button]})
        var filterReaction = (reaction, user) => {
            return ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣"].includes(reaction.emoji.name) && ((user.id === player1.id) || (user.id === player2.id));
        }
        const filterButton = (i) => {return (i.user.id === player1.id) || (i.user.id===player2.id)}
        const ReactionCollector = msg.createReactionCollector({filter: filterReaction});
        const ButtonCollector = msg.createMessageComponentCollector({componentType: ComponentType.Button, filter: filterButton});
        var TieButtonCollector = undefined;
        var TieInteraction = undefined;
        var TieTimeout = undefined;
        var DelayTieTimeout = undefined;
        var CountdownTimeout;
        


        async function removeReaction(reaction, emoji, user) {
		    await reaction.message.reactions.cache.get(emoji).users.remove(user);
		}
        async function removeAllReaction() {
            ReactionCollector.stop();
            msg.reactions.cache.get("1️⃣").remove();
            msg.reactions.cache.get("2️⃣").remove();
            msg.reactions.cache.get("3️⃣").remove();
            msg.reactions.cache.get("4️⃣").remove();
            msg.reactions.cache.get("5️⃣").remove();
            msg.reactions.cache.get("6️⃣").remove();
            msg.reactions.cache.get("7️⃣").remove();
        }
        const endGame = () => {
            clearTimeout(CountdownTimeout);
            removeAllReaction();
            if (DelayTieTimeout !== undefined) {clearTimeout(DelayTieTimeout); DelayTieTimeout=undefined;}
            if (TieTimeout !== undefined) {clearTimeout(TieTimeout); TieTimeout=undefined;}
            if (TieInteraction !== undefined) {TieInteraction.editReply({content: "Trò chơi đã kết thúc!", components: []}); TieInteraction=undefined;}
            if (TieButtonCollector !== undefined) {TieButtonCollector.stop(); TieButtonCollector = undefined;}
            ButtonCollector.stop();
        }
        const GiveUp = (user) => {
            player = (user.id === player1.id) ? list[1] : list[0];
            embed = new Discord.EmbedBuilder()
                .setColor(colorEmbed())
                .setTitle('Connect Four')
                .setAuthor({name: "Connect Four | Trận đấu kết thúc"})
                .setDescription(`${renderBoard()}\n\n${titleBattle()}\n\n**${player.color} ${player.user} đã dành chiến thắng!**`)
                .setTimestamp()
                .setFooter({text: `Trận đấu kết thúc | ${player.user.username} thắng do Đối thủ Bỏ cuộc`})
            msg.edit({embeds: [embed], components: []})
            endGame();
        }
        const TieByVote = (NguoiQuyetDinh, NguoiXinHoa) => {
            TieInteraction.editReply({content: `${NguoiXinHoa}, ${NguoiQuyetDinh} đã chấp nhận xin hòa`, components: []})
            TieInteraction = undefined;
            embed = new Discord.EmbedBuilder()
                .setColor("Orange")
                .setTitle('Connect Four')
                .setAuthor({name: "Connect Four | Trận đấu kết thúc"})
                .setDescription(`${renderBoard()}\n\n${titleBattle()}\n\n**HÒA!**`)
                .setTimestamp()
                .setFooter({text: `Trận đấu kết thúc | Hòa do Xin hòa`})
            msg.edit({embeds: [embed], components: []}) 
            endGame(); // Ở đây clear TieTimeout rồi
            TieTimeout = undefined;
        }
        const CantTieByVote = (NguoiQuyetDinh, NguoiXinHoa) => {
            TieButtonCollector.stop();
            TieButtonCollector = undefined;
            TieInteraction.editReply({content: `${NguoiXinHoa}, ${NguoiQuyetDinh} đã không chấp nhận xin hòa`, components: []})
            TieInteraction = undefined;
            clearTimeout(TieTimeout);
            TieTimeout = undefined;
            DelayTieTimeout = setTimeout(() => {
                button = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId("bocuoc")
                        .setLabel("Bỏ Cuộc")
                        .setEmoji("🏳️")
                        .setStyle(ButtonStyle.Danger),
                    new ButtonBuilder()
                        .setCustomId("xinhoa")
                        .setLabel("Xin hòa")
                        .setEmoji("🤝")
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(false)
                )
                msg.edit({components: [button]}); 
            }, DelayTieTime*1000);
            button = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("bocuoc")
                    .setLabel("Bỏ Cuộc")
                    .setEmoji("🏳️")
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId("xinhoa")
                    .setLabel(`Xin hòa (${DelayTieTime}s)`)
                    .setEmoji("🤝")
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true)
            )
            msg.edit({components: [button]}); 
        }
        const XinHoa = (NguoiQuyetDinh, NguoiXinHoa, TinNhan) => {
            const TieFilter = (i) => {return (i.user.id === NguoiQuyetDinh.id)}
            TieButtonCollector = TinNhan.createMessageComponentCollector({componentType: ComponentType.Button, filter: TieFilter, max: 1, time: TieTimeout*1000});
            TieTimeout = setTimeout(() => {
                CantTieByVote(NguoiQuyetDinh, NguoiXinHoa);
            }, TieVotetime*1000);
            TieButtonCollector.on("collect", (i) => {
                if (i.customId === "chapnhanhoa") {return TieByVote(NguoiQuyetDinh, NguoiXinHoa);}
                if (i.customId === "khongchapnhanhoa") {return CantTieByVote(NguoiQuyetDinh, NguoiXinHoa);}
            })
            TieButtonCollector.on("ignore", (i) => {
                i.reply({content: `Mình không hỏi bạn :sweat_smile:`, ephemeral: true})
            })
        }
		const isEmpty = (emoji) => {
			return (emoji === "⚪");
		}
        const tontai = (h1, c1) => {
            return (!!board[h1])&&(!!board[h1][c1]);
        }
        const hasFour = (h1, c1, h2, c2, h3, c3, h4, c4) => {return tontai(h1, c1) && (!isEmpty(board[h1][c1]) && (board[h1][c1]===board[h2][c2]) && (board[h2][c2]===board[h3][c3]) && (board[h3][c3]===board[h4][c4]))}
        const CheckWinByNgang = (hang) => {
            for (let o = 0; o<4; o++) {
                let o1= o, o2=o1+1, o3=o2+1, o4=o3+1;
                if (hasFour(hang, o1, hang, o2, hang, o3, hang, o4)) return true;
            }
            return false;
        }
        const CheckWinByDoc = (cot) => {
            for (let o=0; o<3; o++) {
                let o1= o, o2=o1+1, o3=o2+1, o4=o3+1;
                if (hasFour(o1, cot, o2, cot, o3, cot, o4, cot)) return true;
            }
            return false;
        }
        const CheckWinByCheo = (hang, cot) => {
            for (let o=0; o>=-3; o--) {
                let h1 = hang+o, c1 = cot-o;
                let h2 = hang+o+1, c2 = cot-o-1;
                let h3 = hang+o+2, c3 = cot-o-2;
                let h4 = hang+o+3, c4 = cot-o-3;
                if (!(tontai(h1, c1)) || !(tontai(h2, c2)) || !(tontai(h3, c3)) || !(tontai(h4, c4))) continue;
                if (hasFour(h1, c1, h2, c2, h3, c3, h4, c4)) return true;
            }
            for (let o=0; o>=-3; o--) {
                let h1 = hang+o, c1 = cot+o;
                let h2 = hang+o+1, c2 = cot+o+1;
                let h3 = hang+o+2, c3 = cot+o+2;
                let h4 = hang+o+3, c4 = cot+o+3;
                if (!(tontai(h1, c1)) || !(tontai(h2, c2)) || !(tontai(h3, c3)) || !(tontai(h4, c4))) continue;
                if (hasFour(h1, c1, h2, c2, h3, c3, h4, c4)) return true;
            }
            return false;
        }
        const WinCheck = (hang, cot) => {
            return (CheckWinByDoc(cot) || CheckWinByNgang(hang) || CheckWinByCheo(hang, cot));
        }
        const TieCheck = () => {
            return SoO<=0;
        }
		const Add = (cot) => {
			if (isEmpty(board[5][cot])) {
				board[5][cot] = player.color;
				return 5;
			}
			else if (isEmpty(board[4][cot])) {
				board[4][cot] = player.color;
				return 4;
			} 
			else if (isEmpty(board[3][cot])) {
				board[3][cot] = player.color;
				return 3;
			}
			else if (isEmpty(board[2][cot])) {
				board[2][cot] = player.color;
				return 2;
			}
			else if (isEmpty(board[1][cot])) {
				board[1][cot] = player.color;
				return 1;
			} 
			else if (isEmpty(board[0][cot])) {
				board[0][cot] = player.color;
				return 0;
			}
		}
        const WinByFour = () => {
            embed = new Discord.EmbedBuilder()
                .setColor(colorEmbed())
                .setTitle('Connect Four')
                .setAuthor({name: "Connect Four | Trận đấu kết thúc"})
                .setDescription(`${renderBoard()}\n\n${titleBattle()}\n\n**${player.color} ${player.user} đã dành chiến thắng!**`)
                .setTimestamp()
                .setFooter({text: `Trận đấu kết thúc | ${player.user.username} thắng do ConnectFour`})
            msg.edit({embeds: [embed], components: []})
            endGame();
        }
        const TieByFour = () => {
            embed = new Discord.EmbedBuilder()
                .setColor("Orange")
                .setTitle('Connect Four')
                .setAuthor({name: "Connect Four | Trận đấu kết thúc"})
                .setDescription(`${renderBoard()}\n\n${titleBattle()}\n\n**HÒA!**`)
                .setTimestamp()
                .setFooter({text: `Trận đấu kết thúc | Hòa do kín bảng`})
            msg.edit({embeds: [embed], components: []})
            endGame();
        }
        const WinByTime = () => {
            player = (player.user.id === player1.id) ? list[1] : list[0];
            embed = new Discord.EmbedBuilder()
                .setColor(colorEmbed())
                .setTitle('Connect Four')
                .setAuthor({name: "Connect Four | Trận đấu kết thúc"})
                .setDescription(`${renderBoard()}\n\n${titleBattle()}\n\n**${player.color} ${player.user} đã dành chiến thắng!**`)
                .setTimestamp()
                .setFooter({text: `Trận đấu kết thúc | ${player.user.username} thắng do Đối thủ hết thời gian (${time}s)`})
            msg.edit({embeds: [embed], components: []})
            endGame();
        }

        

        ButtonCollector.on("collect", async (i) => {
            switch (i.customId) {
                case "bocuoc":
                    GiveUp(i.user);
                    break;
            
                case "xinhoa":
                    let NguoiXinHoa = i.user;
                    let NguoiQuyetDinh = ((i.user.id === player1.id) ? list[1] : list[0]).user;
                    button = new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setCustomId("bocuoc")
                            .setLabel("Bỏ Cuộc")
                            .setEmoji("🏳️")
                            .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder()
                            .setCustomId("xinhoa")
                            .setLabel("Đã có người xin hòa")
                            .setEmoji("🤝")
                            .setStyle(ButtonStyle.Primary)
                            .setDisabled(true)
                    )
                    var XinHoaButton = new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setCustomId("chapnhanhoa")
                            .setLabel("Chấp nhận")
                            .setEmoji("🤝")
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId("khongchapnhanhoa")
                            .setLabel("Từ chối (30s)")
                            .setEmoji("❌")
                            .setStyle(ButtonStyle.Secondary)
                    )
                    msg.edit({components: [button]});
                    i.reply({content:`${NguoiQuyetDinh}, ${NguoiXinHoa} muốn xin hòa với bạn`, components: [XinHoaButton]}); 
                    TieInteraction = i;
                    let TinNhan = await i.fetchReply();
                    XinHoa(NguoiQuyetDinh, NguoiXinHoa, TinNhan);
                    break;
                default:
                    i.deferUpdate();
                    break;
            }
        })
        ButtonCollector.on("ignore", (i) => {
            i.reply({content: "Bạn không tham gia vào trò chơi này!", ephemeral: true})
        })
        CountdownTimeout = setTimeout(() => {WinByTime();}, time*1000);
        ReactionCollector.on("collect", async (reaction, user) => {
            if (user.id === player.user.id) {
                clearTimeout(CountdownTimeout);
                let cot;
                SoO--;
                switch (reaction.emoji.name) {
                    case "1️⃣":
                        cot = 0;
                        break;
                    case "2️⃣":
                        cot = 1;
                        break;
                    case "3️⃣":
                        cot = 2;
                        break;
                    case "4️⃣":
                        cot = 3;
                        break;
                    case "5️⃣":
                        cot = 4;
                        break;
                    case "6️⃣":
                        cot = 5;
                        break;
                    case "7️⃣":
                        cot = 6;
                        break;
                    default:
                        break;
                }
		    	let hang = Add(cot);
		    	if (!isEmpty(board[0][cot])) {
                    msg.reactions.cache.get(reaction.emoji.name).remove();
                } 
                // embed = new Discord.EmbedBuilder()
                //     .setColor(colorEmbed())
                //     .setTitle('Connect Four')
                //     .setAuthor({name: "Connect Four | Trận đấu đang diễn ra"})
                //     .setDescription(`${renderBoard()}\n\n${titleBattle()}\n${turnOf()}\n\n${MissonTitle}`)
                //     .setTimestamp()
                //     .setFooter({text: `Trận đấu đang diễn ra | ${player.user.username} đã lựa chọn`})
                // msg.edit({embeds: [embed]})
                if (WinCheck(hang, cot)) {
                    return WinByFour(); 
                } else if (TieCheck()) {
                    return TieByFour();
                }
            }
			removeReaction(reaction, reaction.emoji.name, user)
            if (user.id === player.user.id) {
                player = (player.user.id === player1.id) ? list[1] : list[0]; //Switch Player
                embed = new Discord.EmbedBuilder()
                    .setColor(colorEmbed())
                    .setTitle('Connect Four')
                    .setAuthor({name: "Connect Four | Trận đấu đang diễn ra"})
                    .setDescription(`${renderBoard()}\n\n${titleBattle()}\n${turnOf()}\n\n${MissonTitle}`)
                    .setTimestamp()
                    .setFooter({text: `Trận đấu đang diễn ra | ${player.user.username} có ${time}s để chọn`})
                CountdownTimeout = setTimeout(() => {WinByTime();}, time*1000);
                msg.edit({embeds: [embed]})
            }
        })
    }
}