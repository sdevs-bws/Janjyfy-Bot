const https = require('https')
const apiConfig = require(`${process.cwd()}/src/config/janjy.api-tokens.js`)

module.exports = {
    async execute(bot) {
        const data = JSON.stringify({
            guilds: bot.guilds.cache.size,
            users: bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
        })

        const options = {
            hostname: 'discordbotlist.com',
            port: 443,
            path: '/api/v1/bots/995397263130112081/stats',
            method: 'POST',
            headers: {
                'Authorization': apiConfig.discordbots.api_token,
                'Content-Type': 'application/json',
            }
        }

        const req = https.request(options)
        req.write(data)
        req.end()
    },
};