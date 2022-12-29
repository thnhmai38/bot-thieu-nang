const Discord = require('discord.js');
const { DiscordTogether } = require('discord-together');

module.exports = {
    name: "together",
    description: "Bắt đầu hoạt động cùng nhau",
    options: [
        {
            name: "name",
            type: 3,
            description: "Game/Ứng dụng bạn muốn bắt đầu",
            required: true,
            choices: [
                {
                    name: "YouTube",
                    value: "youtube"
                },
                {
                    name: "Poker",
                    value: "poker"
                },
                {
                    name: "Betrayal",
                    value: "betrayal"
                },
                {
                    name: "Fishing",
                    value: "fishing"
                },
                {
                    name: "Chess",
                    value: "chess"
                },
                {
                    name: "Lettertile",
                    value: "lettertile"
                },
                {
                    name: "Wordsnack",
                    value: "wordsnack"
                },
                {
                    name: "Doodlecrew",
                    value: "doodlecrew"
                },
                {
                    name: "Awkword",
                    value: "awkword"
                },
                {
                    name: "Spellcast",
                    value: "spellcast"
                },
                {
                    name: "Checkers",
                    value: "checkers"
                },
                {
                    name: "Puttparty",
                    value: "puttparty"
                },
                {
                    name: "Sketchheads",
                    value: "sketchheads"
                },
                {
                    name: "Ocho",
                    value: "ocho"
                },
                {
                    name: "Puttpartyqa",
                    value: "puttpartyqa"
                }, 
                {
                    name: "Sketchyartist",
                    value: "sketchyartist"
                },
                {
                    name: "Land",
                    value: "land"
                },
                {
                    name:"Meme",
                    value: "meme"
                }, 
                {
                    name: "Askaway",
                    value: "askaway"
                }, 
                {
                    name: "Bobble",
                    value: "bobble"
                }
            ]
        }
    ],

    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
    async run (client, interaction, option) {
        
        client.discordTogether = new DiscordTogether(client);
        if(interaction.member.voice.channel) {
            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, option[0].value).then(async invite => {
                return interaction.reply(`BẤM VÀO **LIÊN KẾT** ĐÂY: ${invite.code}`)  
            });
        } else interaction.reply({content: `Bạn phải ở trong 1 kênh nói thoại`, ephemeral: true});
    }
}