const weather = require('weather-js');
const Discord = require('discord.js');
const colors = require('colors');

module.exports = {
    name: "weather",
    description: "Checks a weather forecast",

    async run (client, message, args){
        
    weather.find({search: args.join(" "), degreeType: 'C'}, function (error, result){
        // 'C' can be changed to 'F' for farneheit results
        if(!args[0]) return message.reply('Vui lòng đưa ra 1 vị trí')
        if (error) {
            console.log(colors.red(error));
            return message.reply({content: `Đã xảy ra lỗi, vui lòng thử lại.`});
        }

        if(result === undefined || result.length === 0) return message.reply('Vị trí không hợp lệ. Vui lòng kiểm tra lại.');

        var current = result[0].current;
        var location = result[0].location;

        const weatherinfo = new Discord.MessageEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`DỰ BÁO THỜI TIẾT Ở ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .setColor(0x111111)
        .addField('Múi giờ', `UTC${location.timezone}`, true)
        .addField('Đơn vị đo', 'Độ Celsius (°C)', true)
        .addField('Nhiệt độ', `${current.temperature}°`, true)
        .addField('Gió', current.winddisplay, true)
        .addField('Cảm nhận thấy', `${current.feelslike}°`, true)
        .addField('Độ ẩm', `${current.humidity}%`, true)

        message.reply({embeds : [weatherinfo]})
        })        
    }
}