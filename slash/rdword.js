var randomWords = require('random-words');
function isNaturalNumber(n) {
    n = n.toString(); // force the value incase it is not
    var n1 = Math.abs(n),
        n2 = parseInt(n, 10);
    return !isNaN(n1) && n2 === n1 && n1.toString() === n;
}
const Discord = require('discord.js')
const { ActionRowBuilder, ButtonBuilder, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "rdword",
    description: "Trả về cụm từ tiếng Anh bất kì",
    options: [
        {
            name: "ex",
            type: 4,
            description: "Số cụm từ được tạo ra",
            required: false,
        },
        {
            name: "wps",
            type: 4,
            description: "Số từ có trong mỗi cụm từ",
            required: false,
        },
        {
            name: "ml",
            type: 4,
            description: "Số kí tự tối đa mỗi từ",
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
        // args0=exactly args1=WordPerString args2=maxLength
        var args = [undefined, undefined, undefined]
        try {
            if (option[0].name == "ex") {
                args[0]=option[0].value
            } else {
                if (option[1].name == "ex") {
                    args[0]=option[1].value
                } else args[0] = option[2].value;
            } 
        } catch {}
        try {
            if (option[0].name == "wps") {
                args[1]=option[0].value
            } else {
                if (option[1].name == "wps") {
                    args[1]=option[1].value
                } else args[1] = option[2].value;
            } 
        } catch {}
        try {
            if (option[0].name == "ml") {
                args[2]=option[0].value
            } else {
                if (option[1].name == "ml") {
                    args[2]=option[1].value
                } else args[2] = option[2].value;
            } 
        } catch {}
        if (!args[0]) {args[0]="1"}
        if (!args[1]) {args[1]="1"}
        if (!args[2]) {args[2]="0"}
        const exactly = Number(args[0])
        const WordPerString = Number(args[1])
        const maxLength = Number(args[2])
        //check
        if (exactly == 0 || WordPerString == 0 || !isNaturalNumber(exactly) || !isNaturalNumber(WordPerString) || !isNaturalNumber(maxLength)) return interaction.reply(`Vui lòng bỏ hoặc nhập đúng giá trị tùy chỉnh`)
        //run
        if (exactly*WordPerString > 30) {if (interaction.member.permissions.has("MANAGE_MESSAGES")) {
            if (maxLength == 0) {interaction.reply(randomWords({exactly: exactly, wordsPerString: WordPerString, join: ' - ' }))} else {
                interaction.reply(randomWords({exactly: exactly, wordsPerString: WordPerString, maxLength: maxLength, join: ' - ' }))
            }
        } else interaction.reply({content: `Tổng cộng có 30 từ trở lên yêu cầu quyền **QUẢN LÍ TIN NHẮN**`, ephemeral: true})
    } else {
        if (maxLength == 0) {interaction.reply(randomWords({exactly: exactly, wordsPerString: WordPerString, join: ' - ' }))} else {
            interaction.reply(randomWords({exactly: exactly, wordsPerString: WordPerString, maxLength: maxLength, join: ' - ' }))
            }
        }
    }
}