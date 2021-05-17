const { initClient } = require('./mongoClient')

const initStore = async () => {
  const { users } = await initClient()
  const addUser = async (user) => await users.updateOne(user, { $set: user }, { upsert: true })
  const removeUser = async (user) => await users.deleteOne(user)
  const listUsers = async ({ serverId }) => await users.find({ serverId }, { _id: 0 }).sort({ score: -1 }).toArray()
  const addScoreToUser = async (user) => await users.updateOne(user, { $inc: { score: 1 } }, { upsert: true })
  const addScoreToUsers = async ({ serverId }) => await users.updateMany({ serverId }, { $inc: { score: 1 } }, { upsert: true })
  return {
    addUser,
    removeUser,
    listUsers,
    addScoreToUser,
    addScoreToUsers,
  }
}

module.exports = initStore