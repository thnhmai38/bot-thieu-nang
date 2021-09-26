const Discord = require("discord.js")
const fetch = require("node-fetch")
function isNaturalNumber(n) {
    n = n.toString(); // force the value incase it is not
    var n1 = Math.abs(n),
        n2 = parseInt(n, 10);
    return !isNaN(n1) && n2 === n1 && n1.toString() === n;
}

module.exports = {
    name: "advice",
    description: "Gives you a advice",
    async run (client, message, args){
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
        if (isNaturalNumber(Number(args[0])) && Number(args[0])!==0) {
            fetch(`https://api.adviceslip.com/advice/${args[0]}`)
                .then(response => response.text())
                .then((response) => {
                    const string = response + `}`;
                    const mat = JSON.parse(string);
                    const data = new Discord.MessageEmbed()
                        .setDescription(`**${mat.slip.advice}**`)
                        .setFooter(`Lời khuyên mã ${mat.slip.id}`)
                        .setColor("RANDOM")
                    message.channel.send({embeds : [data]})
                })
                .catch(err => message.channel.send(`Đã xảy ra lỗi : ${err}`))
        } //g
        else {
            const main = await fetch("https://api.adviceslip.com/advice");
            const mat = await main.json();

            const data = new Discord.MessageEmbed()
                .setDescription(`**${mat.slip.advice}**`)
                .setFooter(`Lời khuyên mã ${mat.slip.id}`)
                .setColor("RANDOM")
            message.channel.send({embeds : [data]})
        }
    }
}