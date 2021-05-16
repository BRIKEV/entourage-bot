const Discord = require('discord.js')
const { prefix, commands } = require('./config')
const { formatComands, getUserFromMention } = require('./utils')


const dotenv = require('dotenv');

const client = new Discord.Client()
dotenv.config();

let total = [] // TODO: db integration

const executeCommand = ({ command, argument, message, server }) => {
  const allCommands = {
    [commands.DEFAULT_COMMAND]: () => {
      const user = getUserFromMention(argument, client)
      total = total.map(u => ((u.username === user.username) ? { ...u, score: u.score + 1 } : u))
      console.log(total)
      message.channel.send(`${argument} es un PUTO!!!`)
    },
    [commands.WARZONE_COMMAND]: () => message.channel.send('WARZONEEEE @everyone !!!'),
    [commands.JAVA_COMMAND]: () => message.channel.send(':poop:'),
    [commands.SHOW_ALL]: () => message.channel.send(formatComands(commands)),
    [commands.ADD_PUTO]: () => { // TODO
      const user = getUserFromMention(argument, client)
      total.push({ username: user.username, id: user.id, serverId: server, score: 0 })
      console.log(total)
      message.channel.send(`${argument} ahora es un puto, ya hay un total de ${(total || []).length} putos`)
    },
    [commands.TODOS]: () => {
      total = total.map(user => ({ ...user, score: user.score + 1 }))
      message.channel.send('Sois todos unos PUTASOS')
    },
    [commands.LIST_SCORE]: () => {
      const list = total.map(user => (`${user.username}: ${user.score} pts`))
      const formattedScoreList = list.join('\r\n')
      message.channel.send(formattedScoreList)
    },
  };
  (allCommands[command])()
}

client.on('message', (message) => {
  if (message.author.bot) return
  if (!message.content.startsWith(prefix)) return
  const commandBody = message.content.slice(prefix.length)
  const args = commandBody.split(' ')
  const server = message.guild.id
  const [command, argument] = args
  executeCommand({ command, argument, message, server })
});

client.login(process.env.BOT_TOKEN)