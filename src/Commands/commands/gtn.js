const Discord = require("discord.js");
function randomXToY(minVal,maxVal)
{
  var randVal = (minVal+(Math.random()*(maxVal-minVal))).toString();
  return Math.round(randVal);
}

module.exports = {
    name: "gtn",
    desciption: "đoán số",

    async run (client, message, args) {
    
    if (!args[0]) {var result = randomXToY(0, 10) 
        var min = 0
        var max = 10
    }
    else if (!args[1] || isNaN(args[0]) || isNaN(args[1]) || Number(args[0]) >= Number(args[1]) || Number(args[0]) < 0) return message.channel.send("Vui lòng bỏ hoặc nhập đúng giá trị tùy chỉnh")
    else if (args[1].length > 10) return message.channel.send("Chúa tể Ngẫu nhiên, Thần đồng Toán học, Ông tổ Thập phân, Chúa số, Con trai Thần, Newton 3")
    else {var result = randomXToY(Number(args[0]), Number(args[1]))
    var min = Number(args[0])
    var max = Number(args[1])
    }
    console.log(`Số ${result}`)
    var resultStr = BigInt(result).toString()

        const filter = m => m.author.id == message.author.id
    
        message.reply(`**Mình có một số nguyên trong khoảng từ ${min} đến ${max} trong đầu. BẠN ĐOÁN NÓ ĐI! Mình cho bạn 4 cơ hội!**`).then(async msg => {
    
            message.channel.awaitMessages({filter, max: 1, time: 60000})
                .then(collected => {
                    var guess = collected.first().content
                    if(isNaN(guess)) {
                        message.channel.send(`**🤦‍♂️ HỂỂỂ... Đây là ĐOÁN SỐ mà!** *Vậy là bạn đoán sai số ${resultStr} rồi*`)
                    } else if (guess == result) {message.channel.send(`**🎉 CHÍNH LÀ NÓ! FIRST TRY!**  *Đó là số ${resultStr}*`)}
                    else if(guess != result) {
                        message.channel.send(`**😥 Sai rồi. Bạn còn 3 lượt trả lời**`)
                        if (guess<result) {message.channel.send(`Số đó lớn hơn ${guess}`)} else {message.channel.send(`Số đó nhỏ hơn ${guess}`)}
                        message.channel.awaitMessages({filter, max: 1, time: 60000})
                        .then(collected => {
                                var guess = collected.first().content
                                if(isNaN(guess)) {
                                    message.channel.send(`**🤦‍♂️ HỂỂỂ... Đây là ĐOÁN SỐ mà!** *Vậy là bạn đoán sai số ${resultStr} rồi*`)
                                } else if(guess == result) {
                                    message.channel.send(`**🎉 CHÍNH LÀ NÓ! BẠN ĐOÁN ĐƯỢC Ở LẦN THỨ 2 ** *Đó là số ${resultStr}*`)
                                } else if(guess != result) {
                                    message.channel.send(`**😥 Sai rồi. Bạn còn 2 lượt trả lời**`)
                                    if (guess<result) {message.channel.send(`Số đó lớn hơn ${guess}`)} else {message.channel.send(`Số đó nhỏ hơn ${guess}`)}
    
                                    message.channel.awaitMessages({filter, max: 1, time: 60000})
                                    .then(collected => {
                                            var guess = collected.first().content
                                            if(isNaN(guess)) {
                                                message.channel.send(`**🤦‍♂️ HỂỂỂ... Đây là ĐOÁN SỐ mà!** *Vậy là bạn đoán sai số ${resultStr} rồi*`)
                                            } else if(guess == result) {
                                                message.channel.send(`**🎉 CHÍNH LÀ NÓ! BẠN ĐOÁN ĐƯỢC Ở LẦN THỨ 3 ** *Đó là số ${resultStr}*`)
                                            } else if(guess != result) {
                                                message.channel.send(`**😥 Sai rồi. ĐÂY LÀ LƯỢT TRẢ LỜI CUỐI CÙNG**`)
                                                if (guess<result) {message.channel.send(`Số đó lớn hơn ${guess}`)} else {message.channel.send(`Số đó nhỏ hơn ${guess}`)}
                                                message.channel.awaitMessages({filter, max: 1, time: 60000})
                                                .then(collected => {
                                                    var guess = collected.first().content
                                                    if(isNaN(guess)) {
                                                    message.channel.send(`**🤦‍♂️ HỂỂỂ... Đây là ĐOÁN SỐ mà!** *Vậy là bạn đoán sai số ${resultStr} rồi*`)
                                                } else if(guess != result) {message.channel.send(`**😥 BẠN ĐÃ THUA. ĐÓ LÀ SỐ ${resultStr}**`)}
                                                else {message.channel.send(`**🎉 CHÍNH LÀ NÓ!** BẠN ĐOÁN ĐƯỢC Ở LẦN THỨ 4 *Đó là số ${resultStr}*`)}
                                                })
                                                .catch(collected => {
                                                    message.channel.send(`HẾT GIỜ! ĐÓ LÀ SỐ ${resultStr}`);
                                                })   
                                            }
                                        })
                                    .catch(collected => {
                                        message.channel.send(`HẾT GIỜ! ĐÓ LÀ SỐ ${resultStr}`);
                                    })
                                }
                            })
                         .catch(collected => {
                             message.channel.send(`HẾT GIỜ! ĐÓ LÀ SỐ ${resultStr}`);
                        })
                    }
                })
            .catch(collected => {
                message.channel.send(`HẾT GIỜ! ĐÓ LÀ SỐ ${resultStr}`);
            })
        })
    } 
}


