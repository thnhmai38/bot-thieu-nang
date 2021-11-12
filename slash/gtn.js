const Discord = require("discord.js");
function randomXToY(minVal,maxVal)
{
  var randVal = (minVal+(Math.random()*(maxVal-minVal))).toString();
  return Math.round(randVal);
}
const { MessageActionRow, MessageButton, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "gtn",
    description: "Đoán số nguyên ngẫu nhiên được khởi tạo",
    options: [
        {
            name: "min",
            type: 3,
            description: "Giá trị nhỏ nhất của số",
            required: false,
        },
        {
            name: "max",
            type: 3,
            description: "Giá trị lớn nhất của số",
            required: false,
        },
    ],
    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
    async run (client, interaction, option) {
        var args = [];
        try {
            if (option[0].name == "min") {
                args[0]=option[0].value
            } else {
                if (option[1].name == "min") {
                    args[0]=option[1].value
                }
            } 
        } catch {}
        try {
            if (option[0].name == "max") {
                args[1]=option[0].value
            } else {
                if (option[1].name == "max") {
                    args[1]=option[1].value
                }
            } 
        } catch {}

        if ((args[0] && !args[1]) || (!args[0] && args[1])) return interaction.reply({content: "Vui lòng bỏ hoặc nhập đúng giá trị tùy chỉnh", ephemeral: true})
        if (!args[0] && !args[1]) {var result = randomXToY(0, 10) 
            var min = 0
            var max = 10
        }
        else if (!args[1] || isNaN(args[0]) || isNaN(args[1]) || Number(args[0]) >= Number(args[1]) || Number(args[0]) < 0) return interaction.editReply({content: "Vui lòng bỏ hoặc nhập đúng giá trị tùy chỉnh", ephemeral: true})
        else if (args[1].length > 10) return interaction.reply("Chúa tể Ngẫu nhiên, Thần đồng Toán học, Ông tổ Thập phân, Chúa số, Con trai Thần, Newton 3")
        else {var result = randomXToY(Number(args[0]), Number(args[1]))
        var min = Number(args[0])
        var max = Number(args[1])
        }
        console.log(`Số ${result}`)
        var resultStr = BigInt(result).toString()

        const filter = m => m.author.id == interaction.user.id
    
        interaction.reply(`**Mình có một số nguyên trong khoảng từ ${min} đến ${max} trong đầu. BẠN ĐOÁN NÓ ĐI! Mình cho bạn 4 cơ hội!**`).then(async () => {
    
            interaction.channel.awaitMessages({filter, max: 1, time: 60000})
                .then(collected => {
                    var guess = collected.first().content
                    if(isNaN(guess)) {
                        interaction.channel.send(`**🤦‍♂️ HỂỂỂ... Đây là ĐOÁN SỐ mà!** *Vậy là bạn đoán sai số ${resultStr} rồi*`)
                    } else if (guess == result) {interaction.channel.send(`**🎉 CHÍNH LÀ NÓ! FIRST TRY!**  *Đó là số ${resultStr}*`)}
                    else if(guess != result) {
                        interaction.channel.send(`**😥 Sai rồi. Bạn còn 3 lượt trả lời**`)
                        if (guess<result) {interaction.channel.send(`Số đó lớn hơn ${guess}`)} else {interaction.channel.send(`Số đó nhỏ hơn ${guess}`)}
                        interaction.channel.awaitMessages({filter, max: 1, time: 60000})
                        .then(collected => {
                                var guess = collected.first().content
                                if(isNaN(guess)) {
                                    interaction.channel.send(`**🤦‍♂️ HỂỂỂ... Đây là ĐOÁN SỐ mà!** *Vậy là bạn đoán sai số ${resultStr} rồi*`)
                                } else if(guess == result) {
                                    interaction.channel.send(`**🎉 CHÍNH LÀ NÓ! BẠN ĐOÁN ĐƯỢC Ở LẦN THỨ 2 ** *Đó là số ${resultStr}*`)
                                } else if(guess != result) {
                                    interaction.channel.send(`**😥 Sai rồi. Bạn còn 2 lượt trả lời**`)
                                    if (guess<result) {interaction.channel.send(`Số đó lớn hơn ${guess}`)} else {interaction.channel.send(`Số đó nhỏ hơn ${guess}`)}
    
                                    interaction.channel.awaitMessages({filter, max: 1, time: 60000})
                                    .then(collected => {
                                            var guess = collected.first().content
                                            if(isNaN(guess)) {
                                                interaction.channel.send(`**🤦‍♂️ HỂỂỂ... Đây là ĐOÁN SỐ mà!** *Vậy là bạn đoán sai số ${resultStr} rồi*`)
                                            } else if(guess == result) {
                                                interaction.channel.send(`**🎉 CHÍNH LÀ NÓ! BẠN ĐOÁN ĐƯỢC Ở LẦN THỨ 3 ** *Đó là số ${resultStr}*`)
                                            } else if(guess != result) {
                                                interaction.channel.send(`**😥 Sai rồi. ĐÂY LÀ LƯỢT TRẢ LỜI CUỐI CÙNG**`)
                                                if (guess<result) {interaction.channel.send(`Số đó lớn hơn ${guess}`)} else {interaction.channel.send(`Số đó nhỏ hơn ${guess}`)}
                                                interaction.channel.awaitMessages({filter, max: 1, time: 60000})
                                                .then(collected => {
                                                    var guess = collected.first().content
                                                    if(isNaN(guess)) {
                                                    interaction.channel.send(`**🤦‍♂️ HỂỂỂ... Đây là ĐOÁN SỐ mà!** *Vậy là bạn đoán sai số ${resultStr} rồi*`)
                                                } else if(guess != result) {interaction.channel.send(`**😥 BẠN ĐÃ THUA. ĐÓ LÀ SỐ ${resultStr}**`)}
                                                else {interaction.channel.send(`**🎉 CHÍNH LÀ NÓ!** BẠN ĐOÁN ĐƯỢC Ở LẦN THỨ 4 *Đó là số ${resultStr}*`)}
                                                })
                                                .catch(collected => {
                                                    interaction.channel.send(`HẾT GIỜ! ĐÓ LÀ SỐ ${resultStr}`);
                                                })   
                                            }
                                        })
                                    .catch(collected => {
                                        interaction.channel.send(`HẾT GIỜ! ĐÓ LÀ SỐ ${resultStr}`);
                                    })
                                }
                            })
                         .catch(collected => {
                             interaction.channel.send(`HẾT GIỜ! ĐÓ LÀ SỐ ${resultStr}`);
                        })
                    }
                })
            .catch(collected => {
                interaction.channel.send(`HẾT GIỜ! ĐÓ LÀ SỐ ${resultStr}`);
            })
        })
    } 
}


