const Discord = require("discord.js");
const fetch = require("node-fetch");
require("dotenv").config();
const {
	Client,
	CommandInteraction,
} = require("discord.js");

module.exports = {
	name: "gtl",
	description: "Đoán Logo",
	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
	 */
	async run(client, interaction, option) {
		await interaction.deferReply();
		const dagpiToken = process.env.DAGPITOKEN;
		const token = dagpiToken;
		const winFooter = "BẠN ĐÃ THẮNG!";
		const winColor = "Green";
		const lostColor = "Red";
		const lostFooter = "Bạn đã đoán sai!";
		const questionColor = "Blue";
        const time = 60; //s

		const data = await fetch(`https://api.dagpi.xyz/data/logo`, {
			headers: {
				Authorization: token,
			},
		}).then((res) => res.json());

		const que = new Discord.EmbedBuilder()
			.setTitle(`Đoán Logo!`)
			.addFields([
				{
					name: `Mô tả: `,
					value: `${data.clue ? data.clue : "Không có"}`,
					inline: true,
				},
				{ name: `Gợi ý: `, value: `${data.hint}` },
			])
			.setColor(questionColor || "Random")
			.setImage(data.question)
			.setTimestamp();
		const right = new Discord.EmbedBuilder()
			.setTitle(`Bạn đã đoán đúng!`)
			.setAuthor({
				name: interaction.user.tag,
				iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
			})
			.setColor(winColor || "Random")
			.setDescription(`Đây là Logo của **${data.brand}**`)
			.setImage(data.answer)
			.setFooter({ text: winFooter })
			.addFields([
				{ name: `Mô tả: `, value: `${data.clue ? data.clue : "Không có"}` },
			])
			.setTimestamp();
		const wrong = new Discord.EmbedBuilder()
			.setTitle(`Bạn đã đoán sai!`)
			.setColor(lostColor || "Random")
			.setAuthor({
				name: interaction.user.tag,
				iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
			})
			.setDescription(`Đây là Logo của **${data.brand}**`)
			.setImage(data.answer)
			.setFooter({ text: lostFooter })
			.addFields([
				{ name: `Mô tả: `, value: `${data.clue ? data.clue : "Không có"}` },
			])
			.setTimestamp();

		await interaction.editReply({ embeds: [que] });
		const gameFilter = (m) => interaction.user.id === m.author.id;
		const gameCollector = interaction.channel.createMessageCollector({filter: gameFilter, time: time*1000, max: 1});

		gameCollector.on("collect", async (msg) => {
			if (msg.author.bot) return;
			const selection = msg.content.toLowerCase();
			if (selection === data.brand.toLowerCase()) {
				msg.reply({ embeds: [right] });
				gameCollector.stop();
			} else {
				msg.reply({ embeds: [wrong] });
				gameCollector.stop();
            }
		});
	},
};
