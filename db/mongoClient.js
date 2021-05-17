const { MongoClient } = require('mongodb')
const { mongo } = require('../config')

const initClient = async () => {
  console.log('Init connection')
  const client = new MongoClient(mongo.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  try {
    await client.connect()
    console.log('Connected!!!')
    const database = client.db(mongo.contentDatabaseName)
    const users = database.collection('users')
    return { users }
  } catch (error) {
    console.error(error)
    await client.close()
  }
}

module.exports = {
  initClient,
}