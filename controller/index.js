const { formatCommands, formatListScores } = require('../utils')
const { commands } = require('../config')

const controller = ({ command, userId, mention, message, serverId }, store, client) => {
  const allCommands = {
    [commands.DEFAULT_COMMAND]: async () => {
      const user = client.users.cache.get(userId)
      await store.addScoreToUser({ username: user.username, id: user.id, serverId })
      message.channel.send(`${mention} es un PUTO!!!`)
    },
    [commands.WARZONE_COMMAND]: () => message.channel.send('WARZONEEEE @everyone !!!'),
    [commands.JAVA_COMMAND]: () => message.channel.send(':poop:'),
    [commands.SHOW_ALL]: () => message.channel.send(formatCommands(commands)),
    [commands.ADD_PUTO]: async () => {
      const user = client.users.cache.get(userId)
      await store.addUser({ username: user.username, id: user.id, serverId })
      const totalUsers = await store.listUsers({ serverId })
      message.channel.send(`${mention} ahora es un puto, ya hay un total de ${(totalUsers || []).length} putos`)
    },
    [commands.TODOS]: async () => {
      await store.addScoreToUsers({ serverId })
      message.channel.send('Sois todos unos PUTASOS')
    },
    [commands.LIST_SCORE]: async () => {
      const totalUsers = await store.listUsers({ serverId })
      const formattedScoreList = formatListScores(totalUsers)
      message.channel.send(formattedScoreList)
    },
    [commands.REMOVE_USER]: async () => {
      const user = client.users.cache.get(userId)
      await store.removeUser({ username: user.username, id: user.id, serverId })
      message.channel.send(`${user.username} dejó de ser un puto :weary:`)
    },
  };
  if (allCommands[command]) (allCommands[command])()
}

module.exports = controller
