//Import some packages needed
const moment = require('moment');
const tz = require('moment-timezone');
const chalk = require('chalk');
const Discord = require('discord.js');
const { Client, Collection } = require("discord.js");
const client = new Client({intents: 32767,});
module.exports = client;

module.exports = {
    name: "time",
    desciption: "Update time",
    async run (client, message, args) {
        const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
        // />time timezone format clockchannel updateinterval
        //clockchannel: // ID of a voice channel that used to display the time
        //timezone:  // Timezone (take a look at https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List, add '(z) in last to show GMT)
        //format:  // Clock format, leave this default seting for 24h format, read more at https://momentjs.com/docs/#/displaying/format/
        //updateinterval // Discord is ratelimiting us for 10 minutes!
        //[ON WORK, IGNORE THIS FIELD] dev: '400581909912223744', // Developer's ID for sending the errors
        const timezone = args[0]
        const format = args[1]
        const clockchannel = args[2]
        const updateinterval = args[3]
        if (!timezone || !format || !clockchannel || !updateinterval) return message.channel.send("VUI LÒNG KIỂM TRA LẠI GIÁ TRỊ CẤU HÌNH");
        if (message.member.permissions.has("MANAGE_CHANNELS")) {        
        if (updateinterval < 600000) {message.channel.send('LỖI : KHOẢNG CÁCH UPDATE PHẢI KHÔNG NHỎ HƠN 600000ms')}
        else {
            //init time
            let timeNow = moment().tz(timezone).format(format);
            //define clockChannel
            const clockChannel = client.channels.cache.get(clockchannel);
            //initial update
            clockChannel.edit({ name: `🕒 ${timeNow}` },`Request by ${message.author.tag}`)
                .catch(console.error);
                message.channel.send('THIẾT ĐẶT THÀNH CÔNG');
            //set the interval
            setInterval(function() {
                let timeNow = moment().tz(timezone).format(format);
                clockChannel.edit({ name: `🕒 ${timeNow}` },`Request by ${message.author.tag}`)
                    .catch(console.error);
            }, updateinterval);
        }
      } else message.channel.send('BẠN KHÔNG ĐỦ THẨM QUYỀN ĐỂ THỰC HIỆN LỆNH NÀY');
    }
}