const Discord = require('discord.js')
const { prefix } = require('./config')
const { formatComands, executeCommand } = require('./utils')


const dotenv = require('dotenv');

const client = new Discord.Client()
dotenv.config();

let total = [] // TODO: db integration


client.on('message', (message) => {
  if (message.author.bot) return
  if (!message.content.startsWith(prefix)) return
  const commandBody = message.content.slice(prefix.length)
  const args = commandBody.split(' ')
  const [command, argument] = args
  executeCommand({ command, argument, message })
});

client.login(process.env.BOT_TOKEN)