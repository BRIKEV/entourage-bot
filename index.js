const Discord = require('discord.js')
const { prefix, commands } = require('./config.js')


const dotenv = require('dotenv');

const client = new Discord.Client()
dotenv.config();

let total = [] // TODO: db integration

const formatComands = (commands) =>  Object.values(commands).map(c => `${prefix}${c}`).join(', ')

const executeCommand = ({ command, argument, message }) => {
  const allCommands = {
    [commands.DEFAULT_COMMAND]: () =>  message.channel.send(`${argument} es un PUTO!!!`),
    [commands.WARZONE_COMMAND]: () => message.channel.send('WARZONEEEE @everyone !!!'),
    [commands.JAVA_COMMAND]: () => message.channel.send(':poop:'),
    [commands.SHOW_ALL]: () => message.channel.send(formatComands(commands)),
    [commands.ADD_PUTO]: () => { // TODO
      total.push({ argument, id: argument })
      message.channel.send(`${argument} ahora es un puto, ya hay un total de ${(total || []).length} putos`)
    },
    [commands.TODOS]: () => message.channel.send('Sois todos unos PUTASOS'),
  };
  (allCommands[command])()
}

client.on('message', (message) => {
  if (message.author.bot) return
  if (!message.content.startsWith(prefix)) return
  const commandBody = message.content.slice(prefix.length)
  const args = commandBody.split(' ')
  const [command, argument] = args
  executeCommand({ command, argument, message })
});

client.login(process.env.BOT_TOKEN)