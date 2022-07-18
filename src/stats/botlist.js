const https = require('https')
const apiConfig = require(`${process.cwd()}/src/config/janjy.api-tokens.js`)

module.exports = {
    async execute(bot) {
        const data = JSON.stringify({
            guilds: bot.guilds.cache.size
        })

        const options = {
          hostname: 'api.botlists.com',
          port: 443,
          path: '/bot/995397263130112081',
          method: 'PATCH',
          headers: {
            'Authorization': apiConfig.botlists.api_token,
            'Content-Type': 'application/json',
          }
        }
        const req = https.request(options)
        req.write(data)
        req.end()
    },
};