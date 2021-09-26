const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
 
//https://pastebin.com/dkbdFccP ; https://www.youtube.com/watch?v=3wJJDM7jUsk

module.exports = {
    name: 'play',
    description: 'Plays a video from youtube',
    async run (client, message, args) {
        console.log(`${message.createdAt} | ${message.author.tag} ${message.author} : ${message}`)
        const voiceChannel = message.member.voice.channel;
 
        if (!voiceChannel) return message.channel.send('Bạn phải ở trong 1 kênh nói mới có thể sử dụng lệnh này!');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('Bạn không có thẩm quyền sử dụng lệnh này');
        if (!permissions.has('SPEAK')) return message.channel.send('Bạn không có thẩm quyền sử dụng lệnh này');
        if (!args.length) return message.channel.send('Đang phát... mà phát gì cơ?');
 
        const validURL = (str) =>{
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            if(!regex.test(str)){
                return false;
            } else {
                return true;
            }
        }
 
        if(validURL(args[0])){
 
            const  connection = await voiceChannel.join();
            const stream  = ytdl(args[0], {filter: 'audioonly'});
 
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                voiceChannel.leave()
                message.channel.send('Đã phát xong, rời đi... :smiling_face_with_tear: ')
            });
 
            await message.reply(`:thumbsup: Đang phát ***${args}***`)
 
            return
        }
 
        
        const  connection = await voiceChannel.join();
 
        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);
 
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
 
        }
 
        const video = await videoFinder(args.join(' '));
 
        if(video){
            const stream  = ytdl(video.url, {filter: 'audioonly'});
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                voiceChannel.leave()
                message.channel.send('Đã phát xong, rời đi... :smiling_face_with_tear: ')
            });
 
            await message.reply(`:thumbsup: Đang phát ***${video.title}***`)
        } else {
            message.channel.send('Không có kết quả :(');
        }
    }
}