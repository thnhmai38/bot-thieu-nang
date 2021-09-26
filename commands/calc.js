const Discord = require('discord.js');
const simplydjs = require('simply-djs')

module.exports = {
    name: "calc",
    description: "math time",

    async run (client, message, args){
    const menu = require('../modules/menu.js')
        const cmdlog = new menu.cmdlog()
        cmdlog.log(message)
    simplydjs.calculator(message, {
        embedColor: '#075FFF', //default: #075FFF
        credit: false,
    })
}
}