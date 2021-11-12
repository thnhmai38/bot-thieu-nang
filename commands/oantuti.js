const luachon = ["bua", "lua", "keo", "ran", "nguoi", "cay", "soi", "botbien", "bao", "khongkhi", "nuoc", "rong", "acquy", "samchop", "sung"]
const name = ["Búa", "Lửa", "Kéo", "Rắn", "Người", "Cây", "Sói", "Bọt biển", "Bao", "Không Khí", "Nước", "Rồng", "Ác quỷ", "Sấm chớp", "Súng"]
const Discord = require("discord.js")
const { MessageActionRow, MessageButton } = require('discord.js');
function demsansang(readylist) {
    var dem = 0;
    for (let i = 0; i < readylist.length; i++) {
        if (readylist[i] == true) {dem++}
    }    
    return dem;
}
function diem(vitri, vt2, array, hs) {
    var dem = 0;
    if (vitri !== -1 && vt2 !== -1) {
        //Hòa  
        if (array[vitri] == array[vt2] && dem==0) return 1 
        //Thắng
        else for (dem = 1; dem < hs+1; dem++) {
            if (vitri+dem <= array.length) {
            //Theo Quy tắc
                if (array[vitri+dem] == array[vt2]) return 2;
            } else {
            //Bất Quy Tắc

            //Giảm liên tục (đến chết)
            function giam(bien, array) {
                let dem = bien;
                if (dem > array.length) {dem = dem - array.length}
                if (dem > array.length) {dem = giam(dem, array)} else return dem;
            }

                if (array[giam(vitri+dem, array)] == array[vt2]) return 2;
            }
        }
    } 
    return 0; // Thua
}

module.exports = {
    name: "oantuti",
    description: "keo bua bao",

    async run(client, message, args) {
        
        
        if (message.mentions.users.size < 2) return message.reply(`Thật buồn khi ta không được chơi với ai...`)
        //Cấu hình
        let readylist = []
        let ready = []
        var player = []
        var savelist = []
        var savetext = []
        var save = []
        var score = []
        var kt = false
        var scoredata = []
        var scoretext = []
        var ingame = false;

        let i = 0
        message.mentions.users.forEach(user => {
            player[i] = user
            i++
        });
        
        let j=0;
        for (i = 0; i < message.mentions.users.size; i++) {
            //i=j-1
            readylist[j] = false 
            savelist[j]= false
            ready[j] = `${player[j]} - ${readylist[j] ? "✅" : "❌"}`
            savetext[j] = `${player[j]} - ${readylist[j] ? "✅" : "❌"}`
            save[j] = -1
            score[j] = 0
            scoredata[j] = [j, score[j], 0, 0, 0]
            scoretext[j] = ""
            j++
        }

        //chuẩn bị các biến
        var list = new Discord.MessageEmbed()
            .setTitle("Đang chờ người chơi sẵn sàng...")
            .setDescription(`Danh sách người chơi:
            ${ready.join("\n")}`)
            .setAuthor('Oản tù tì Phiên bản Mở rộng')
            .setFooter(`${demsansang(readylist)}/${readylist.length} sẵn sàng`)
            .setThumbnail(`https://photo-cms-viettimes.zadn.vn/w666/Uploaded/2021/firns/2019_03_11/7ea25208ab4942171b58.jpg`)
            .setColor("BLUE")
            .setTimestamp()
        let readybutton = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('ready')
                .setLabel('Sẵn sàng!')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('unready')
                .setLabel('Hủy sẵn sàng')
                .setStyle('SECONDARY'),
        );
        let luachon1 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('bua')
                .setLabel('Búa')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('lua')
                .setLabel('Lửa')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('keo')
                .setLabel('Kéo')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('ran')
                .setLabel('Rắn')
                .setStyle('PRIMARY'),
                new MessageButton()
                .setCustomId('nguoi')
                .setLabel('Người')
                .setStyle('PRIMARY'),
        );
        let luachon2 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('cay')
                .setLabel('Cây')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('soi')
                .setLabel('Sói')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('botbien')
                .setLabel('Bọt Biển')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('bao')
                .setLabel('Bao')
                .setStyle('PRIMARY'),
                new MessageButton()
                .setCustomId('khongkhi')
                .setLabel('Không Khí')
                .setStyle('PRIMARY'),
        );
        let luachon3 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('nuoc')
                .setLabel('Nước')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('rong')
                .setLabel('Rồng')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('acquy')
                .setLabel('Ác Quỷ')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('samchop')
                .setLabel('Sấm Chớp')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('sung')
                .setLabel('Súng')
                .setStyle('PRIMARY'),
        );

        
        //Phần ready và đợi
        message.reply({embeds : [list], components : [readybutton]}).then((msg)=> {
            const filter = (interaction) => {
                for (let k = 0; k < player.length; k++) {
                    if (interaction.user.id == player[k].id) return true;
                }
            }
            const collector = msg.createMessageComponentCollector({componentType: 'BUTTON', filter})
            collector.on("collect", interaction => {
                interaction.deferUpdate();
             //Ready
                if (interaction.customId === 'ready') {
                    var find;    
                    for (let k = 0; k < player.length; k++) {
                        if (interaction.user.id == player[k].id) {find = k}
                    }
                    readylist[find] = true
                    ready[find] = `${player[find]} - ${readylist[find] ? "✅" : "❌"}`
                    var list = new Discord.MessageEmbed()
                        .setTitle("Đang chờ người chơi sẵn sàng...")
                        .setDescription(`Danh sách người chơi:
                        ${ready.join("\n")}`)
                        .setAuthor('Oản tù tì Phiên bản Mở rộng')
                        .setFooter(`${demsansang(readylist)}/${readylist.length} sẵn sàng`)
                        .setThumbnail(`https://photo-cms-viettimes.zadn.vn/w666/Uploaded/2021/firns/2019_03_11/7ea25208ab4942171b58.jpg`)
                        .setColor("BLUE")
                        .setTimestamp()
                    msg.edit({embeds : [list]})
                }
                if (interaction.customId === 'unready') {
                    var find;    
                    for (let k = 0; k < player.length; k++) {
                        if (interaction.user.id == player[k].id) {find = k}
                    }
                    readylist[find] = false 
                    ready[find] = `${player[find]} - ${readylist[find] ? "✅" : "❌"}`
                    var list = new Discord.MessageEmbed()
                        .setTitle("Đang chờ người chơi sẵn sàng...")
                        .setDescription(`Danh sách người chơi:
                        ${ready.join("\n")}`)
                        .setAuthor('Oản tù tì Phiên bản Mở rộng')
                        .setFooter(`${demsansang(readylist)}/${readylist.length} sẵn sàng`)
                        .setThumbnail(`https://photo-cms-viettimes.zadn.vn/w666/Uploaded/2021/firns/2019_03_11/7ea25208ab4942171b58.jpg`)
                        .setColor("BLUE")
                        .setTimestamp()
                    msg.edit({embeds : [list]})
                }
             //Wait 15s
                if (demsansang(readylist) == readylist.length && kt==false) {
                    if (ingame == false) {
                        var list = new Discord.MessageEmbed()
                        .setAuthor("Oản tù tì phiên bản Mở rộng")
                        .setTitle(`Trò chơi sẽ bắt đầu sau 15s`)
                        .setDescription(`**Luật chơi:**
                        Thắng sẽ được 2 điểm
                        Hòa sẽ được 1 điểm
                        Thua sẽ không được điểm`)
                        .setImage(`https://photo-cms-viettimes.zadn.vn/w666/Uploaded/2021/firns/2019_03_11/7ea25208ab4942171b58.jpg`)
                        .setColor("YELLOW")
                        .setTimestamp()
                        msg.edit({embeds : [list], components : []})
                    }
                        setTimeout(function(){
                            if (kt == true) return;
                            var start = new Discord.MessageEmbed()
                                .setAuthor("Oản tù tì phiên bản Mở rộng")
                                .setTitle(`Oản tù tì, ra cái gì, ra cái...`)
                                .setDescription(`**Luật chơi:**
                            Thắng sẽ được 2 điểm
                            Hòa sẽ được 1 điểm
                            Thua sẽ không được điểm`)
                                .setThumbnail(`https://photo-cms-viettimes.zadn.vn/w666/Uploaded/2021/firns/2019_03_11/7ea25208ab4942171b58.jpg`)
                                .setColor("YELLOW")
                                .setTimestamp()
                            msg.edit({embeds : [start], components : [luachon1,luachon2,luachon3]})
                        },15000)
                    ingame = true;
                 //Phần chính

                    if (luachon.includes(interaction.customId) && kt==false) {
                        var lcid = luachon.indexOf(interaction.customId)
                        var findk;    
                        for (let k = 0; k < player.length; k++) {
                            if (interaction.user.id == player[k].id) {findk = k}
                        }
                        if (savelist[findk] == false) {
                            savelist[findk] = true 
                            savetext[findk] = `${player[findk]} - ✅`
                            save[findk] = lcid;
                        } // Chống chọn 2 lần
                        var start = new Discord.MessageEmbed()
                            .setAuthor("Oản tù tì phiên bản Mở rộng")
                            .setTitle(`Oản tù tì, ra cái gì, ra cái...`)
                            .setDescription(`Danh sách người chơi đã chọn:
                            ${savetext.join("\n")}`)
                            .setThumbnail(`https://photo-cms-viettimes.zadn.vn/w666/Uploaded/2021/firns/2019_03_11/7ea25208ab4942171b58.jpg`)
                            .setColor("YELLOW")
                            .setFooter(`${demsansang(savelist)}/${savelist.length} đã chọn`)
                            .setTimestamp()
                        if (kt == true) return;
                        msg.edit({embeds : [start]})

                        if (demsansang(savelist) == savelist.length) {
                         //Tính điểm
                            for (let i = 0; i < save.length; i++) {
                                for (let j = 0; j < save.length; j++) {
                                    if (i !== j) {
                                        score[i] = score[i] + diem(save[i], save[j], luachon, 7)
                                        scoredata[i][1] = score[i]
                                        scoredata[i][0] = i; //Đặt lại thứ tự do bên trên đặt sai
                                        if (diem(save[i], save[j], luachon, 7) == 2) {scoredata[i][2]++}
                                        else if (diem(save[i], save[j], luachon, 7) == 1) {scoredata[i][3]++}
                                        else if (diem(save[i], save[j], luachon, 7) == 0) {scoredata[i][4]++}
                                    }
                                } 
                            }
                         //Sắp xếp Rank
                            var tam = [];
                            for (i = 0; i < scoredata.length - 1; i++) {
                                for (j = i + 1; j < scoredata.length; j++) {
                                    if (scoredata[i][1] < scoredata[j][2]) {
                                        tam = scoredata[i];
                                        scoredata[i] = scoredata[j];
                                        scoredata[j] = tam;
                                        
                                    }
                                }
                            }
                            for (i = 0; i < scoredata.length; i++) {
                                if (i==0) {scoretext[i] = `**🥇Hạng ${i+1} : ${player[scoredata[i][0]]} : ${scoredata[i][1]} điểm (${scoredata[i][2]}/${scoredata[i][3]}/${scoredata[i][4]}) ** (Chọn *${name[save[scoredata[i][0]]]}*)`}
                                else if (i==1) {scoretext[i] = `**🥈Hạng ${i+1} : ${player[scoredata[i][0]]} : ${scoredata[i][1]} điểm (${scoredata[i][2]}/${scoredata[i][3]}/${scoredata[i][4]})** (Chọn *${name[save[scoredata[i][0]]]}*)`}
                                else if (i==2) {scoretext[i] = `**🥉Hạng ${i+1} : ${player[scoredata[i][0]]} : ${scoredata[i][1]} điểm (${scoredata[i][2]}/${scoredata[i][3]}/${scoredata[i][4]})** (Chọn *${name[save[scoredata[i][0]]]}*)`}
                                else {scoretext[i] = `${i+1}. ${player[scoredata[i][0]]} : ${scoredata[i][1]} điểm (${scoredata[i][2]}/${scoredata[i][3]}/${scoredata[i][4]}) (Chọn *${name[save[scoredata[i][0]]]}*)`}
                            }

                            var end = new Discord.MessageEmbed()
                                .setAuthor("Oản tù tì phiên bản Mở rộng")
                                .setTitle(`Trò chơi kết thúc!`)
                                .setDescription(`Danh sách điểm:
                                ${scoretext.join("\n")}`)
                                .setThumbnail(`https://photo-cms-viettimes.zadn.vn/w666/Uploaded/2021/firns/2019_03_11/7ea25208ab4942171b58.jpg`)
                                .setColor("GREEN")
                                .setTimestamp()
                            msg.edit({embeds : [end], components : []})
                            kt = true; // Anti-Repeat
                            if (kt == true) return;
                        }
                    }
                }
                if (kt == true) return;
            })
            if (kt == true) return;
        })
        if (kt == true) return;
    }
}