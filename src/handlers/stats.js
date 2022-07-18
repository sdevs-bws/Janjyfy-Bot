const { readdirSync } = require("fs")

module.exports = (bot) => {
  const statFiles = readdirSync(`${process.cwd()}/src/stats`).filter(file => file.endsWith('.js'));
  for (const file of statFiles) {
    const stats = require(`${process.cwd()}/src/stats/${file}`);
    stats.execute(bot)
    setInterval(function() {
      stats.execute(bot)
    }, 60000 * 30);
  }
};