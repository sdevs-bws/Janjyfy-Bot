const banSchema = require(`${process.cwd()}/src/schemas/ban-schema.js`);
module.exports = {
  name: 'guildBanRemove',
  once: false,
  async execute(bot, ban) {

    const conditional = {
      UserID: ban.user.id,
      Current: true,
    }
    await banSchema.updateMany(conditional, {
      Current: false,
    });
  },
};