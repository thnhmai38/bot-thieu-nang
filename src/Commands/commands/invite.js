const fs = require('fs');
const config = JSON.parse(fs.readFileSync("config.json"));

module.exports = {
    name: "invite",
    description: "Invite Bot",

    async run (client, message, args) {
        message.reply({files: [`${config.source.assets}/invite.png`]});
   }
}