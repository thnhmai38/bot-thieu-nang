const Discord = require("discord.js")
const fetch = require("node-fetch")
function isNaturalNumber(n) {
    n = n.toString(); // force the value incase it is not
    var n1 = Math.abs(n),
        n2 = parseInt(n, 10);
    return !isNaN(n1) && n2 === n1 && n1.toString() === n;
}
const { MessageActionRow, MessageButton, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "advice",
    description: "Đưa ra một lời khuyên",
    options: [
        {
            name: "id",
            type: 4,
            description: "Mã lời khuyên chỉ định",
            required: false,
        }
    ],
    /**
        *
        * @param {Client} client
        * @param {CommandInteraction} interaction
        * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
        */
    async run (client, interaction, option) {
        try {
            var num = option[0].value;
        } catch {
            var num=0;
        }
        if (isNaturalNumber(Number(num)) && Number(num)!==0) {
            fetch(`https://api.adviceslip.com/advice/${num}`)
                .then(response => response.text())
                .then((response) => {
                    const string = response
                    const mat = JSON.parse(string);

                    try {
                        const data = new Discord.MessageEmbed()
                            .setDescription(`**${mat.slip.advice}**`)
                            .setFooter({text: `Lời khuyên mã ${mat.slip.id}`})
                            .setColor("RANDOM")
                        interaction.reply({embeds : [data], ephemeral: false})
                    } catch {
                        interaction.reply({content: `Không có lời khuyên mã **${num}**`, ephemeral: true})
                    }
                })
                .catch(err => interaction.reply({content: `Đã xảy ra lỗi : ${err}`, ephemeral: true}))
        }
        else {
            const main = await fetch("https://api.adviceslip.com/advice");
            const mat = await main.json();

            const data = new Discord.MessageEmbed()
                .setDescription(`**${mat.slip.advice}**`)
                .setFooter({text: `Lời khuyên mã ${mat.slip.id}`})
                .setColor("RANDOM")
                interaction.reply({embeds : [data], ephemeral: false})
        }
    }
}