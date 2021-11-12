const Discord = require('discord.js');
const simplydjs = require('simply-djs')

module.exports = {
    name: "calc",
    description: "math time",

    async run (client, message, args){
    
    simplydjs.calculator(message, {
        embedColor: '#075FFF', //default: #075FFF
        credit: false,
    })
}
}