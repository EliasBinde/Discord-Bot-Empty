run_bot = () => {
    
    //Import json
    const {prefix, bot_info} = require('../config.json')
    //Discord

    const log = require(`../modules/log.js`)

    const Discord = require("discord.js")
    const fs = require('fs')
    const client = new Discord.Client()
    client.commands = new Discord.Collection()

    const commandFiles = fs.readdirSync(__dirname + '/../commands').filter(file => file.endsWith('.js'))


    client.on("ready", () => {
        console.log(`logged in as ${client.user.tag}!`)
    })



    for(const file of commandFiles){
        const command = require(`../commands/${file}`)
        client.commands.set(command.name, command)
    }

    client.on("message", msg => {
        
        if(!msg.content.startsWith(prefix) || msg.author.bot) return
        
        const args = msg.content.slice(prefix.length).trim().split(/ +/)
        const command = args.shift().toLowerCase()


        if(!client.commands.has(command)) return
        try{
            client.commands.get(command).execute(msg, args)
            log(msg, args)
        }
        catch (error) {
            //console.error(error)
            log(msg, args, error)
            message.reply('Dieser Befehl konnte nicht ausgeführt werden!')
        }
    })

    client.login('Your Token goes here')

}

module.exports = run_bot;