const { readdirSync } = require("fs")

module.exports = (bot) => {
  const commandFolders = readdirSync(`${process.cwd()}/src/slash_commands`);
  
  for (const folder of commandFolders) {
    const commandFiles = readdirSync(`${process.cwd()}/src/slash_commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const command = require(`${process.cwd()}/src/slash_commands/${folder}/${file}`);
      bot.commands.set(command.name, command);
    }
  }
};