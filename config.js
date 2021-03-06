const prefix = '!'

const commands = {
  DEFAULT_COMMAND: 'puto',
  WARZONE_COMMAND: 'warson',
  JAVA_COMMAND: 'java',
  SHOW_ALL: 'commands',
  TODOS: 'todos',
  LIST_SCORE: 'listscores',
  REMOVE_USER: 'removeputo',
}

const mongo = {
  connectionString: process.env.DB_CONNECTION_STRING || 'mongodb://node:node@localhost:27017/entourage-bot',
  contentDatabaseName: process.env.DATABASE_NAME || 'entourage-bot',
}

module.exports = {
  prefix,
  commands,
  mongo,
}