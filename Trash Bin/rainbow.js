const Discord = require("discord.js");
const client = new Discord.Client({
    ws: { intents: new Discord.Intents(Discord.Intents.ALL) },
});
const chalk = require("chalk");
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});
// />rainbow 1 5000 idguild "kimochi"
module.exports = {
    //name: "rainbow",
    //desciption: "create rainbow role",

    async run (client, message, args) {
        console.log(`${message.createdAt} | ${message.author.tag} ${message.author} : ${message}`)
       client.guilds
       .fetch(args[2])
       .then((g) => {
       console.log(`Fetching Guild ID: ${args[2]}`);

        //var guildID = message.guild.id;
        let answer = args[0];
        const delay = args[1]; 
        // don't use under 10s as you may get rate limited 
        // and/or banned because of a Discord TOS violation.
        console.log(answer)
        console.log(delay)
        // BIG THANKS : https://stackoverflow.com/questions/68318128/i-cant-create-automatic-change-color-role-discord-js-v12/68318468#68318468
    if (delay <10000) {
            message.channel.send("LỖI: VỚI ĐỘ LẶP LẠI DƯỚI 10s/LẦN, MÌNH KHÔNG MUỐN BỊ LAG ĐÂU ~~~");
        } else if (answer === "1") {
            // FAST MODE 
            const colors = ["#8585ff", "#fff681", "#a073fd","#fd73b9"];
            let i = 0; // color counter
            
            message.channel.send("Đã tạo `new rainbow role`");
            // some code here
            message.guild.roles.create({
            data: {
                name: `new rainbow role`,
                color: "#ffffff",
            }, reason: `Create FAST RAINBOW MODE by ${message.author.tag}`,
        })
            .then((role) => {
                setInterval(function () {
                    role.edit({
                        color: colors[i]
                    })
                    .then(() => ++i % colors.length) // increment i only if the color has changed
                                                      // and make sure that it's a valid index
                    .catch(); // catch to prevent errors from stopping the app
                }),
                delay
            })
            .catch((error) => {message.channel.send("LỖI KHI TẠO 1 ROLE MỚI")});
        } 
    
        else if (answer === "2") {
        while (true) {
            // Gradient Mode
            //const pos = guild.me.roles.highest.position - 2
        message.guild.roles.create({
                data: {
                    color: "#f04747",
                   // position: pos,
                }, reason: `Create GRADIENT RAINBOW MODE by ${message.author.tag}`
            }) //CODE
        }
    } else {
        message.channel.send("LỖI: SAI CHẾ ĐỘ CHUYỂN MÀU"); }
   })
}
}









