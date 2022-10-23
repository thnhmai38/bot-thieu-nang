const Discord = require('discord.js')
function randomXToY(minVal,maxVal)
{
  var randVal = (minVal+(Math.random()*(maxVal-minVal))).toString();
  return Math.round(randVal);
}
const { ActionRowBuilder, ButtonBuilder, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "roll",
    description: "Trả về một số nguyên ngẫu nhiên trong khoảng",
    options: [
        {
            name: "min",
            type: 3,
            description: "Giá trị nhỏ nhất của khoảng",
            required: true,
        },
        {
            name: "max",
            type: 3,
            description: "Giá trị lớn nhất của khoảng",
            required: true,
        },
    ],
    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
    async run (client, interaction, option) {
        var args = [0, 0];
        args[0] = option[0].name==`min` ? option[0].value : option[1].value;
        args[1] = option[0].name==`max` ? option[0].value : option[1].value;
        var x = Number(args[0])
        var y = Number(args[1])
        if (isNaN(x) || isNaN(y)) return interaction.reply({content: `Vui lòng nhập số`, ephemeral: true});
        if (x>y) interaction.reply({content: `Làm gì có số nào trong khoảng đó :)))`, ephemeral: true})
        else {
            if (args[0].length < 23 && args[1].length < 23) {
                var x = Number(args[0])
                var y = Number(args[1])
                var roll = randomXToY(x, y)
                interaction.reply(`🎲 ${interaction.user} xúc ra **${roll}** điểm`);
            } else if (interaction.member.permissions.has(`MANAGE_MESSAGES`)) {
                var x = Number(args[0])
                var y = Number(args[1])
                var roll = randomXToY(x, y)
                if (roll == "Infinity") {interaction.reply(`*Hoa hết cả mắt* :face_with_spiral_eyes:`)} 
                else {
                    const n2 = BigInt(roll)
                    interaction.reply(`🎲 ${interaction.user} xúc ra **${n2.toString()}** điểm`);
            } 
        } else interaction.reply({content: "Số trên có nhiều hơn 22 chữ số yêu cầu bạn phải có quyền **Quản lí Tin nhắn** để tránh *SPAM*", ephemeral: true})
    }
}}
