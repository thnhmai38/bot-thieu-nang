const fs = require("fs");
const config = JSON.parse(fs.readFileSync("config.json"));
const package = JSON.parse(fs.readFileSync("package.json"));
const os = require("os");
const totalRAM = os.totalmem();

const cmdFolder = config.source.command;
const slsFolder = config.source.slash;
const assets = config.assets;

const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const {
	ActionRowBuilder,
	ButtonBuilder,
	Client,
	CommandInteraction,
} = require("discord.js");

module.exports = {
	name: "info",
	description: "Thông tin về Bot",
	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
	 */
	async run(client, interaction, option) {
		var command, slash, cpustring = "";
		const cmdcount = fs.readdirSync(cmdFolder).length;
    	const slscount = fs.readdirSync(slsFolder).length;
		const cpu = os.cpus();
		for (const core of cpu) {
			cpustring += "`" + core.model + "`" + "\n";
		}
		const osEmbed = new EmbedBuilder()
			.setTitle(`🖥️ Hệ thống`)
			.setColor("Blue")
			.setDescription(`**Powered by Konfuse** <3`)
			.addFields(
				{
					name: "🖥️ Hệ điều hành",
					value: `\`${os.version()} ${os.arch()}\``,
					inline: true,
				},
				{
					name: "💿 RAM",
					value: `${(
						Math.round((totalRAM / 1024 / 1024 / 1024) * 100) / 100
					).toString()} GB`,
					inline: true,
				},
				{
					name: "⌛ PC Runtime",
					value: `${(
						Math.round((os.uptime().toFixed(1) / 3600) * 1000) / 1000
					).toString()}h`,
					inline: true,
				},
				{
					name: "🔲 CPU",
					value: cpustring,
				}
			);
		const botEmbed = new EmbedBuilder()
			.setTitle(`🤖 Bot`)
			.setColor("Purple")
			.addFields(
				{
					name: "🏷️ Tên",
					value: client.user.username,
					inline: true,
				},
				{
					name: "📲 Prefix",
					value: config.prefix,
					inline: true,
				},
				{
					name: ":balloon: Ngày tham gia",
					value: `${client.user.createdAt.getDate()}/${client.user.createdAt.getMonth()}/${client.user.createdAt.getFullYear()}`,
					inline: true
				},
				{
					name: "🛠️ Version",
					value: package.version,
					inline: true,
				},
				{
					name: "💬 Số lệnh chữ",
					value: cmdcount.toString(),
					inline: true,
				},
				{
					name: "⛏️ Số lệnh Slash",
					value: slscount.toString(),
					inline: true,
				},
				{
					name: "⌛ Bot Runtime",
					value: `${(
						Math.round((process.uptime().toFixed(1) / 3600) * 1000) / 1000
					).toString()}h`,
					inline: true,
				},{
					name: "💿 Node.js Version",
					value: process.version,
					inline: true,
				},
				{
					name: "💎 Discord.js Version",
					value: package.dependencies["discord.js"],
					inline: true,
				},
			);
		const actiEmbed = new EmbedBuilder()
			.setTitle(`🌐 Hoạt động`)
			.setColor("Green")
			.addFields(
				{
					name: "📡 Số Máy chủ",
					value: client.guilds.cache.size.toString(),
					inline: true,
				},
				{
					name: ":tv: Số kênh",
					value: client.channels.cache.size.toString(),
					inline: true,
				},
				{
					name: "👤 Số Người dùng",
					value: client.users.cache.size.toString(),
					inline: true,
				},
				{
					name: "🏓 Bot Latency",
					value: `${Date.now() - interaction.createdTimestamp}ms`,
					inline: true,
				},
				{
					name: "☎️ API Latency",
					value: `${Math.round(client.ws.ping)}ms`,
					inline: true,
				}
			)
			.setTimestamp();
		interaction.reply({embeds: [botEmbed, osEmbed, actiEmbed], ephemeral: true});
	},
};
