const Discord = require('discord.js')
const { MessageActionRow, MessageButton, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "skip",
    description: "Bỏ qua bài nhạc đang phát",
    inVoiceChannel: true,
    /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {Object[]} option //{ name: 'id', type: 'INTEGER', value: 69 }
    */
    async run (client, interaction, option) {
        
        if (!interaction.member.voice.channel) return interaction.reply({content: `${client.emotes.error} |  Bạn phải ở trong một kênh nói`, ephemeral: true});
        if (interaction.guild.members.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.members.me.voice.channel.id) return interaction.reply({content: `${client.emotes.error} |  Bạn phải ở cùng kênh nói với Bot`, ephemeral: true}); 

        const queue = client.distube.getQueue(interaction)
        if (!queue) return interaction.reply({content: `${client.emotes.error} | Chả có gì đang phát cả`, ephemeral: true})
        const owner = queue.owner;

        function skip(a) {
            try {
                if (queue.songs.length == 1) {
                    queue.stop()
                    interaction.reply(`${client.emotes.stop} | **Đã dừng nhạc! (${a===1? `Force Skip`: `Voteskip`})**`)
                } else {
                    const song = queue.skip(queue)
                    interaction.channel.send(`${client.emotes.success} | **Đã bỏ qua bài nhạc! (${a===1? `Force Skip`: `Voteskip`})**`)
                    if (queue.repeatMode === 2) {
                        interaction.channel.send(client.emotes.queue + " | **Đang phát nhạc ở chế độ \"Lặp toàn bộ\", vì vậy bài nhạc này sẽ được phát lại sau.** Thay đổi bằng `/>loop`")
                    }
                }
            } catch (e) {
                    interaction.reply({content: `${client.emotes.error} | Lỗi: ${e}`, ephemeral: true})
                        .catch(interaction.editReply({content: `${client.emotes.error} | Lỗi: **${e}**`, ephemeral: true}))

            }
        }
        if (interaction.user.id === owner.id || queue.voiceChannel.permissionsFor(interaction.user.id).has("MUTE_MEMBERS") || queue.voiceChannel.permissionsFor(interaction.user.id).has("MOVE_MEMBERS")) {
            skip(1)
        } else {
            const count = queue.voiceChannel.members.filter(member => !member.user.bot).size;
            if (count < 3) {skip(1)} else 
            {
                const song = queue.songs[0];
                if (!song.voteskip) {song.voteskip = []}; //Tạo mảng
                if (!song.voteskip.includes(interaction.user.id)) {
                    song.voteskip.push(interaction.user.id); //Thêm người
                    song.voteskip = Array.from(new Set(song.voteskip)); //Dọn rác
                    interaction.reply(`${client.emotes.queue} | ${interaction.user} đã **voteskip** bài hát này *\`(${song.voteskip.length}/${Math.floor(count*0.75)}, ${Math.floor(count*0.75)-song.voteskip.length} nữa để skip)\`*`);
                } else {
                    song.voteskip.splice(song.voteskip.indexOf(interaction.user.id), 1);
                    interaction.reply(`${client.emotes.queue} | ${interaction.user} đã **hủy voteskip** bài hát này *\`(${song.voteskip.length}/${Math.floor(count*0.75)}, ${Math.floor(count*0.75)-song.voteskip.length} nữa để skip)\`*`);
                }
                if (song.voteskip.length>=Math.floor(count*0.75)) {skip(2)}
            }
        }
    }
}