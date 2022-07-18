const https = require('https')
const apiConfig = require(`${process.cwd()}/src/config/janjy.api-tokens.js`)

module.exports = {
  async execute(bot) {
    const data = JSON.stringify({
      server_count: bot.guilds.cache.size
    })

    const options = {
      hostname: 'top.gg',
      port: 443,
      path: '/api/bots/995397263130112081/stats',
      method: 'POST',
      headers: {
        'Authorization': apiConfig.topgg.api_token,
        'Content-Type': 'application/json',
      }
    }

    const req = https.request(options)
    req.write(data)
    req.end()
  },
};