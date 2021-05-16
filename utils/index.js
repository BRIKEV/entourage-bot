const { commands } = require('../config')


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

const getUserFromMention = (mention) => {
	const matches = mention.match(/^<@!?(\d+)>$/)
	if (!matches) return
  const [_, id] = matches
	return client.users.cache.get(id);
}

module.exports = {
  executeCommand,
  getUserFromMention,
  formatComands,
}