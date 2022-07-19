const localCommands = require(`${process.cwd()}/src/resources/commands.json`);
const config = require(`${process.cwd()}/src/config/janjy.config.js`)

module.exports = {
  name: 'ready',
  once: true,
  async execute(bot) {

    bot.user.setStatus('idle')
    console.log("[!]:  ✅  Bot successfully connected as "+bot.user.tag+".");
    bot.user.setStatus('online')
    let num = 0
    const activities = [
      { name: config.statuses.status1.name, type: config.statuses.status1.type },
    ];

    setInterval(function () {
      if (num == 3) num = 0
      bot.user.setActivity(activities[num])
      num++
    }, 30000);

    let location
    let DEV_GUILD

    if (!DEV_GUILD) {
      location = bot.application
    } else {
      location = await bot.guilds.cache.get(DEV_GUILD)
    }

    let guildCommands = await location?.commands?.fetch();

    for (let i = 0; i < localCommands.length; i++) {
      let focusedCommand = guildCommands?.find(cmd => cmd.name === localCommands[i]?.name);

      if (!focusedCommand) {
        console.log(`[!]:  ✅  INFO | Updated slash commands (ready.js)`)
        return location?.commands?.set(localCommands);
      }

      if (guildCommands.size > localCommands.length) {
        console.log(`[!]:  ✅  INFO | Updated slash commands (ready.js)`)
        return location?.commands?.set(localCommands);
      }

      const NameDiffrentce = focusedCommand?.name != localCommands[i]?.name;

      const DescriptionNameDiffrentce = focusedCommand?.description != localCommands[i]?.description;

      const OptionsDiffrentce = JSON.stringify(focusedCommand.options) != JSON.stringify(localCommands[i]?.options);

      if (NameDiffrentce || DescriptionNameDiffrentce || OptionsDiffrentce) {
        console.log(`[!]:  ✅  INFO | Updated slash commands (ready.js)`)
        return location?.commands?.set(localCommands);
      }
    }
  },
};