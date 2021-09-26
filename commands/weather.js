const weather = require('weather-js');
const Discord = require('discord.js');

module.exports = {
    name: "weather",
    description: "Checks a weather forecast",

    async run (client, message, args){
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
    weather.find({search: args.join(" "), degreeType: 'C'}, function (error, result){
        // 'C' can be changed to 'F' for farneheit results
        if(error) return message.channel.send(error);
        if(!args[0]) return message.channel.send('Vui lòng đưa ra 1 vị trí')

        if(result === undefined || result.length === 0) return message.channel.send('Vị trí không hợp lệ. Vui lòng kiểm tra lại.');

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

        message.channel.send({embeds : [weatherinfo]})
        })        
    }
}