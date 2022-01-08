const weather = require('weather-js');
const Discord = require('discord.js');
const colors = require('colors');
const { MessageActionRow, MessageButton, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "weather",
    description: "Dự báo thời tiết",
    options: [
        {
            name: "text",
            type: 3,
            description: "Vị trí cần dò",
            required: true
        }],
    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
     async run (client, interaction, option) {
        
    weather.find({search: option[0].value, degreeType: 'C'}, function (error, result) {
        if (error) {
            console.log(colors.red(error));
            return interaction.reply({content: `Đã xảy ra lỗi, vui lòng thử lại.`, ephemeral: true});
        }
        if (result === undefined || result.length === 0) return interaction.reply({content: 'Vị trí không hợp lệ. Vui lòng kiểm tra lại.', ephemeral: true});

        var current = result[0].current;
        var location = result[0].location;

        const weatherinfo = new Discord.MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor({name : `DỰ BÁO THỜI TIẾT Ở ${current.observationpoint}`})
            .setThumbnail(current.imageUrl)
            .setColor(0x111111)
            .addField('Múi giờ', `UTC${location.timezone}`, true)
            .addField('Đơn vị đo', 'Độ Celsius (°C)', true)
            .addField('Nhiệt độ', `${current.temperature}°`, true)
            .addField('Gió', current.winddisplay, true)
            .addField('Cảm nhận thấy', `${current.feelslike}°`, true)
            .addField('Độ ẩm', `${current.humidity}%`, true)

        interaction.reply({embeds : [weatherinfo]})
        })        
    }
}