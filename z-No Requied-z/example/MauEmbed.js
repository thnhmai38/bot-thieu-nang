// at the top of your file
const Discord = require('discord.js');

// inside a command, event listener, etc.
module.exports = {
    name: "test",
    description: "Test",

	//example : https://i.imgur.com/GyChaXg.png
    async run (client, message, args) {
	const exampleEmbed = new Discord.EmbedBuilder()
		.setColor('#0099ff')
		.setTitle('Some title')
		.setURL('https://discord.js.org/')
		.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
		.setDescription('Some description here')
		.setThumbnail('https://i.imgur.com/wSTFkRM.png')
		.addFields(
			{ name: 'Regular field title1', value: 'Some value here' },
			{ name: '\u200B', value: '\u200B' },
			{ name: 'Inline field title 2', value: 'Some value here', inline: true },
			{ name: 'Inline field title 3', value: 'Some value here', inline: true },
		)
		.addFields([{name: 'Inline field title', value: 'Some value here'}])
		.setImage('https://i.imgur.com/wSTFkRM.png')
		.setTimestamp()
		.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

    message.channel.send({embeds : [exampleEmbed]});
    }
}