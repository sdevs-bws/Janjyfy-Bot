const Embeds = require(`${process.cwd()}/src/resources/embeds.json`)
const muteSchema = require(`${process.cwd()}/src/schemas/mute-schema.js`)
const banSchema = require(`${process.cwd()}/src/schemas/ban-schema.js`)
const roleSchema = require(`${process.cwd()}/src/schemas/role-schema.js`)
const kickSchema = require(`${process.cwd()}/src/schemas/kick-schema.js`)

module.exports = {
  name: 'interactionCreate',
  once: false,

  async execute(bot, interaction) {
    if (!interaction.isCommand()) return;
    if (!bot.commands.has(interaction.commandName)) return;

    interaction.channel = await bot.channels.fetch(interaction.channel.id);
    interaction.guild = await bot.guilds.fetch(interaction.guild.id);

    let db = new Object()
    db.muteSchema = muteSchema
    db.banSchema = banSchema
    db.roleSchema = roleSchema
    db.kickSchema = kickSchema

    try {
       await bot.commands.get(interaction.commandName).execute(interaction, bot, db);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: null, embeds: [Embeds.CommandError], ephemeral: true });
    }
  },
};