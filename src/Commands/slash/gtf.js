const Discord = require("discord.js");
const fetch = require("node-fetch");
require("dotenv").config();
const {
	ActionRowBuilder,
	ButtonBuilder,
	Client,
	CommandInteraction,
} = require("discord.js");

module.exports = {
	name: "gtf",
	description: "Đoán cờ đất nước",
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

		const data = await fetch(`https://api.dagpi.xyz/data/flag`, {
			headers: {
				Authorization: token,
			},
		}).then(res => res.json());

		const que = new Discord.EmbedBuilder()
			.setTitle(`ĐOÁN CỜ!`)
			.addFields([{ name: `Thủ đô: `, value: `${data.Data.capital}` }])
			.setColor(questionColor || "Random")
			.setImage(data.flag)
			.setTimestamp();

		const right = new Discord.EmbedBuilder()
			.setTitle(`Bạn đã đoán đúng!`)
			.setAuthor({
				name: interaction.user.tag,
				iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
			})
			.setColor(winColor || "Random")
			.setDescription(`Đây là nước **${data.Data.name.common}**`)
			.setImage(data.flag)
			.setFooter({ text: winFooter })
			.setTimestamp();

		const wrong = new Discord.EmbedBuilder()
			.setTitle(`Bạn đã đoán sai!`)
			.setColor(lostColor || "Random")
			.setAuthor({
				name: interaction.user.tag,
				iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
			})
			.setDescription(`Đây là nước **${data.Data.name.common}**`)
			.setImage(data.flag)
			.setFooter({ text: lostFooter })
			.setTimestamp();

		interaction.editReply({ embeds: [que] });
		const gameFilter = (m) => interaction.user.id === m.author.id;
        const gameCollector = interaction.channel.createMessageCollector({filter: gameFilter, time: time*1000, max: 1});

		gameCollector.on("collect", async (msg) => {
			if (msg.author.bot) return;
			const selection = msg.content;
			if (selection === data.Data.name.common.toLowerCase()) {
				msg.reply({ embeds: [right] });
				gameCollector.stop();
			} else {
				msg.reply({ embeds: [wrong] });
				gameCollector.stop();
			}
		});
	},
};
