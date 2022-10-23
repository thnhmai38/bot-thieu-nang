const Discord = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, Message, Client } = require('discord.js');
const luachon = ["bua", "lua", "keo", "ran", "nguoi", "cay", "soi", "botbien", "bao", "khongkhi", "nuoc", "rong", "acquy", "samchop", "sung"]
const name = ["Búa", "Lửa", "Kéo", "Rắn", "Người", "Cây", "Sói", "Bọt biển", "Bao", "Không Khí", "Nước", "Rồng", "Ác quỷ", "Sấm chớp", "Súng"]
const { ButtonStyle, ComponentType} = require('discord.js');

module.exports = {
    name: "oantuti",
    description: "oantuti",

    /**
    *
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    async run (client, message, args) {
        if (message.mentions.members.size < 2 || message.mentions.members.size > 21) return message.reply("Trò chơi yêu cầu tối thiểu 2 người và tối đa 20 người chơi")
        try {
            var SoLuaChon = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            var DiemSoCuaLuaChon = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            const TimeToReady = 30;
            const WaitTime = 15;
            const TimeToChoose = 60; // >15
            const image = "https://photo-cms-viettimes.zadn.vn/w666/Uploaded/2021/firns/2019_03_11/7ea25208ab4942171b58.jpg"
            
            { // Methods
                { // Ready Methods
                    var readystring = (member, ready) => {
                        return `<@${member.id}> - ${(ready) ? "✅" : "❌"}`;
                    }
                    var fullreadystring = (players) => {
                        let string = ` `;
                        for (let player of players) {
                            string += readystring(player, player.ready) + "\n"; 
                        }
                        return string;
                    }
                    var countready = (players) => {
                    counter = 0;
                    for (let player of players) {
                        if (player.ready) counter++;
                    }
                    return counter;
                    }
                }

                { // Choose Methods
                    var choosestring = (member) => {
                    return `<@${member.id}> - ${(member.choose===-1) ? "❌" : "✅"}`;
                    } 
                    var fullchoosestring = (players) => {
                    let string = ` `;
                    for (let player of players) {
                        string += choosestring(player) + "\n";
                    } 
                    return string;
                    }

                    var NameToNum = (name) => {
                        return luachon.indexOf(name);
                    }

                    var TimViTri = (member) => {
                        for (let i=0; i<players.length; i++) {
                            if (member.user.id === players[i].id) return i;
                        }
                        return -1;
                    }

                    var XacDinhLuaChon = (number) => {
                        if (number<0) {
                            return luachon.length-1+number
                        }
                        if (number>luachon.length-1) {
                            return number-luachon.length+1;
                        }
                        return number;
                    }

                    function Write(msg) {
                        let string = ` `;
                        for (let i = 0; i < players.length; i++) {
                            string += `${(i<3)?"**":" "}${(i===0)?"🥇 Hạng ":(i===1)?"🥈 Hạng ":(i===2)?"🥉 Hạng ":" " + (i+1) + (i>=3)?". ":" : "} <@${players[i].id}> : ${players[i].score} điểm (${(players[i].choose===-1)?"*Không chọn*":("Chọn *"+name[players[i].choose]+"*")})${(i<3)?"**":" "}` + "\n";
                        }
                        content
                            .setColor('Green')
                            .setTitle('Trò chơi KẾT THÚC!')
                            .setDescription(string)
                            .setTimestamp()
                            .setFooter({text: `Kết thúc!`})
                        msg.edit({embeds: [content], components: []});
                        throw "ended"
                    }

                    function Caculate(msg) {
                        for (let i=0; i<DiemSoCuaLuaChon.length; i++) {
                            DiemSoCuaLuaChon[i] = 2*(SoLuaChon[XacDinhLuaChon(i+1)] + SoLuaChon[XacDinhLuaChon(i+2)] + SoLuaChon[XacDinhLuaChon(i+3)] + SoLuaChon[XacDinhLuaChon(i+4)] + SoLuaChon[XacDinhLuaChon(i+5)] + SoLuaChon[XacDinhLuaChon(i+6)] + SoLuaChon[XacDinhLuaChon(i+7)]) + SoLuaChon[i] - 1;
                        }
                        for (let player of players) {
                            if (player.choose==-1) continue;
                            player.score = DiemSoCuaLuaChon[player.choose];
                        }
                        players.sort((playerA, playerB) => playerA - playerB)
                        Write(msg);
                    }
                }
                var filter = (interaction) => {
                    for (let player of players) {
                        if (interaction.user.id == player.id) return true;
                    }
                    return false;
                }
            }
            { // Button
                var readybutton = new ActionRowBuilder()
                .addComponents(
                new ButtonBuilder()
                    .setCustomId('ready')
                    .setLabel('Sẵn sàng!')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('unready')
                    .setLabel('Hủy sẵn sàng')
                    .setStyle(ButtonStyle.Secondary),
                );

                var luachon1 = new ActionRowBuilder()
                .addComponents(
                new ButtonBuilder()
                    .setCustomId('bua')
                    .setLabel('Búa')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('lua')
                    .setLabel('Lửa')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('keo')
                    .setLabel('Kéo')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('ran')
                    .setLabel('Rắn')
                    .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                    .setCustomId('nguoi')
                    .setLabel('Người')
                    .setStyle(ButtonStyle.Primary),
                );
                var luachon2 = new ActionRowBuilder()
                .addComponents(
                new ButtonBuilder()
                    .setCustomId('cay')
                    .setLabel('Cây')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('soi')
                    .setLabel('Sói')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('botbien')
                    .setLabel('Bọt Biển')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('bao')
                    .setLabel('Bao')
                    .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                    .setCustomId('khongkhi')
                    .setLabel('Không Khí')
                    .setStyle(ButtonStyle.Primary),
                );
                var luachon3 = new ActionRowBuilder()
                .addComponents(
                new ButtonBuilder()
                    .setCustomId('nuoc')
                    .setLabel('Nước')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('rong')
                    .setLabel('Rồng')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('acquy')
                    .setLabel('Ác Quỷ')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('samchop')
                    .setLabel('Sấm Chớp')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('sung')
                    .setLabel('Súng')
                    .setStyle(ButtonStyle.Primary),
                );
            }
            { // Player
                var players = [];
                for (let i=0; i<message.mentions.members.size; i++) {
                    players[i] = {
                        data: message.mentions.members.at(i),
                        ready: false,
                        choose:-1,
                        score:0,
                        id: message.mentions.members.at(i).id
                    }
                }
            }

            var content = new Discord.EmbedBuilder()
                .setColor('Blue')
                .setTitle('Đang chờ người chơi sẵn sàng...')
                .setAuthor({name: 'Oản tù tì (Mở rộng)'})
                .setDescription(fullreadystring(players))
                .setThumbnail(image)
                .setTimestamp()
                .setFooter({text: `${countready(players)}/${players.length} người chơi sẵn sàng`})
            message.channel.send({embeds: [content], components: [readybutton]}).then((msg) => {
                //!Sự kiện In-game
                function Ingame() {
                    setTimeout(() => {
                        content
                            .setTitle(`Oản tù tì, ra cái gì, ra cái...`)
                            .setDescription(fullchoosestring(players))
                            .setFields([])
                            .setTimestamp()
                            .setFooter({text: `0/${players.length} đã chọn`})
                        msg.edit({embeds: [content], components: [luachon1, luachon2, luachon3]})
                        var choosecollector = msg.createMessageComponentCollector({componentType: ComponentType.Button, filter})
                        let chooseCounter = 0;
                        let RunningLastTenSec = false;

                        let ChooseTimer = setTimeout(() => {
                            if (!RunningLastTenSec) {
                                content
                                    .setColor("Orange")
                                    .setTitle(`10s CUỐI ĐỂ THAY ĐỔI LỰA CHỌN!`)
                                    .setDescription(fullchoosestring(players))
                                    .setFooter({text: `${chooseCounter}/${players.length} đã chọn`})
                                msg.edit({embeds: [content]})
                                RunningLastTenSec = true;
                                setTimeout(() => {
                                    choosecollector.stop()
                                    Caculate(msg);
                                }, 10000)
                            }
                        }, TimeToChoose*1000-10000)
                        choosecollector.on("collect", interaction => {
                            interaction.deferUpdate();
                            let vitri = TimViTri(interaction)
                            if (players[vitri].choose===-1) {
                                let dachon = NameToNum(interaction.customId);
                                players[vitri].choose = dachon;
                                SoLuaChon[dachon]++;
                                chooseCounter++
                                content
                                    .setDescription(fullchoosestring(players))
                                    .setFooter({text: `${chooseCounter}/${players.length} đã chọn`})
                                msg.edit({embeds: [content]});
                            } else {
                                SoLuaChon[players[vitri].choose]--;
                                let dachon = NameToNum(interaction.customId);
                                players[vitri].choose = dachon;
                                SoLuaChon[dachon]++;
                            }

                            if (chooseCounter === players.length) {
                                clearTimeout(ChooseTimer);
                                content
                                    .setColor("Orange")
                                    .setTitle(`10s CUỐI ĐỂ THAY ĐỔI LỰA CHỌN!`)
                                    .setDescription("Tất cả người chơi đều đã chọn")
                                    .setFooter({text: `Liệu bạn có thể dành chiến thắng?`})
                                msg.edit({embeds: [content]})
                                if (!RunningLastTenSec) {
                                    RunningLastTenSec = true;
                                    setTimeout(() => {
                                        choosecollector.stop()
                                        Caculate(msg);
                                    }, 10000)
                                }
                            }
                        })
                    }, WaitTime*1000)
                }

                //!Sự kiện Ready    
                    var readycollector = msg.createMessageComponentCollector({componentType: ComponentType.Button, filter})
                    let readyCounter = 0;
                    setTimeout(() => { //Tự động hủy khi người chơi không sẵn sàng hết
                    if (readyCounter !== players.length) {
                        readycollector.stop();
                        content
                            .setColor('Red')
                            .setTitle("Trò chơi đã bị hủy")
                            .setDescription("Trò chơi bị hủy do tất cả người chơi chưa sẵn sàng")
                            .setTimestamp() 
                            .setFooter({text: " "})
                        msg.edit({embeds: [content], components: []})
                        throw "ended"
                        }
                    }, TimeToReady*1000)
                    readycollector.on("collect", interaction => {
                        interaction.deferUpdate();
                        switch (interaction.customId) {
                            case "ready":
                            for (let player of players) {
                                if (player.id == interaction.user.id) {
                                    if (!player.ready) {
                                        player.ready=true;
                                        content
                                            .setDescription(fullreadystring(players))
                                            .setFooter({text: `${countready(players)}/${players.length} người chơi sẵn sàng`})
                                        msg.edit({embeds: [content]});
                                        readyCounter++;
                                    }
                                    break;
                                }
                            }
                            break;
                            
                            case "unready":
                            for (let player of players) {
                                if (player.id == interaction.user.id) {
                                    if (player.ready) {
                                        player.ready=false;
                                        content
                                            .setDescription(fullreadystring(players))
                                            .setFooter({text: `${countready(players)}/${players.length} người chơi sẵn sàng`})
                                        msg.edit({embeds: [content]});
                                        readyCounter--;
                                    }
                                    break;
                                }
                            }
                            break;    

                            default:
                                break;
                        }
                        if (readyCounter === players.length) {
                        content
                            .setColor('Yellow')
                            .setTitle(`Trò chơi bắt đầu sau ${WaitTime}s...`)
                            .setDescription("Luật chơi: Dùng vũ khí bạn chọn và dành lấy điểm cao nhất khi đối đấu với mọi người (Xem hình bên)")
                            .setFields([
                                {name: "Thắng", value: "2 điểm", inline:true},
                                {name: "Hòa", value: "1 điểm", inline:true},
                                {name: "Thua", value: "0 điểm", inline:true},
                            ])
                            .setThumbnail(image)
                            .setTimestamp()
                            .setFooter({text: `Hãy suy nghĩ phương án của mình để chuẩn bị tham chiến!`})
                        msg.edit({embeds: [content], components: []})
                        readycollector.stop();
                        Ingame();
                        }
                    })
            })
        } catch (e) {
            if (e !== "ended") {
                console.error(e);
            } 
        }
    }
}