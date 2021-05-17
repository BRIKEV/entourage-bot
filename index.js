const Discord = require('discord.js')
const { commands } = require('./config')
const initStore = require('./db/store')
const { commandRegex } = require('./utils')
const commandController = require('./controller')


const dotenv = require('dotenv')

const client = new Discord.Client()
dotenv.config()

initStore().then((store) => {
  client.on('message', (message) => {
    if (message.author.bot) return
    const serverId = message.guild.id
    console.log(`Recived message from server: ${serverId}`)
    const matches = [...message.content.matchAll(commandRegex(commands))]
    if (!matches.length) return
    matches.forEach(args => {
      const [_, command, mention, userId] = args
      commandController({ command, userId, mention, message, serverId }, store, client)
    })
  });

  client.login(process.env.BOT_TOKEN)

})
