const formatComands = (commands) =>  Object.values(commands).map(c => `${prefix}${c}`).join(', ')

const getUserFromMention = (mention, client) => {
	const matches = mention.match(/^<@!?(\d+)>$/)
	if (!matches) return
  const [_, id] = matches
  return client.users.cache.get(id)
}

module.exports = {
  getUserFromMention,
  formatComands,
}