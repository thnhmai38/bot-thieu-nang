const fetch = require("node-fetch");
const Discord = require("discord.js");
const { CommandInteraction, Client } = require("discord.js");
require("dotenv").config();

const time = 60; //s

module.exports = {
	name: "gtp",
	description: "Đoán pokemon",
	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
	 */
	async run(client, interaction, option) {
		await interaction.deferReply();
		var data;
		await fetch(`https://api.dagpi.xyz/data/wtp`, {
			headers: {
				Authorization: process.env.DAGPITOKEN,
			},
		})
			.then((res) => res.json())
			.then((dat) => (data = dat));
		const pok = new Discord.EmbedBuilder()
			.setTitle(`Đây là Pokemon gì?`)
			.addFields([
				{ name: `Thể loại:`, value: `${data.Data.Type}` },
				{ name: `Năng lực:`, value: `${data.Data.abilities}` },
			])
			.setImage(data.question)
			.setColor("Random")
			.setTimestamp();
		const right = new Discord.EmbedBuilder()
			.setTitle(`Bạn đã đoán đúng!`)
			.setAuthor({ name: interaction.user.tag })
			.setURL(data.Data.Link)
			.setDescription(`Nó là ${data.Data.name}`)
			.setImage(data.answer)
			.setColor("Random")
			.addFields([
				{ name: `Thể loại:`, value: `${data.Data.Type}`, inline: true },
				{ name: `Năng lực:`, value: `${data.Data.abilities}` },
			])
			.setTimestamp();
		const wrong = new Discord.EmbedBuilder()
			.setTitle(`Bạn đã đoán sai!`)
			.setAuthor({ name: interaction.user.tag })
			.setURL(data.Data.Link)
			.setDescription(`Nó là ${data.Data.name}`)
			.setImage(data.answer)
			.setColor("Random")
			.addFields([
				{ name: `Thể loại:`, value: `${data.Data.Type}`, inline: true },
				{ name: `Năng lực:`, value: `${data.Data.abilities}` },
			])
			.setTimestamp();
		interaction.editReply({ embeds: [pok] });
		const gameFilter = (m) => {
			return interaction.user.id === m.author.id;
		};
		const gameCollector = interaction.channel.createMessageCollector({
			filter: gameFilter,
			time: time * 1000,
			max: 1,
		});

		gameCollector.on("collect", async (msg) => {
			const selection = msg.content.toLowerCase();
			if (selection === data.Data.name.toLowerCase()) {
				msg.reply({ embeds: [right] });
				gameCollector.stop();
			} else {
				msg.reply({ embeds: [wrong] });
				gameCollector.stop();
			}
		});
	},
};
