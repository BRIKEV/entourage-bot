const { prefix } = require('../config')

const formatCommands = (commands) =>  Object.values(commands).map(c => `${prefix}${c}`).join(', ')

const commandRegex = (commands) => new RegExp(`!(${Object.values(commands).join('|')})(?:\\s+)?(<@!([0-9]+)>)?`, 'g')

const formatListScores = (users) => users.map(user => (`${user.username}: ${user.score} pts`)).join('\r\n')

module.exports = {
  formatCommands,
  formatListScores,
  commandRegex,
}