const { MongoClient } = require('mongodb')
const { mongo } = require('../config')

const initClient = async () => {
  const client = new MongoClient(mongo.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  try {
    await client.connect()
    const database = client.db(mongo.contentDatabaseName)
    const users = database.collection('users')
    return { users }
  } catch (error) {
    await client.close()
  }
}

module.exports = {
  initClient,
}