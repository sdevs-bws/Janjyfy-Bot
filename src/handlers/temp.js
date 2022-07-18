const banSchema = require(`${process.cwd()}/src/schemas/ban-schema.js`);
const muteSchema = require(`${process.cwd()}/src/schemas/mute-schema.js`);
const roleSchema = require(`${process.cwd()}/src/schemas/role-schema.js`);

module.exports = (bot) => {
  async function mutes() {
    const conditional = {
      Expires: { $lt: new Date() },
      Current: true,
    }
    const results = await muteSchema.find(conditional);

    if (results && results.length) {
      for (const result of results) {
        const guild = await bot.guilds.fetch(result.GuildID);
        try {
          const member = await guild.members.fetch(result.UserID);
          const role = await roleSchema.findOne({ GuildID: guild.id });
          member.roles.remove(role.RoleID);
        } catch (error) {
          await muteSchema.updateMany(conditional, {
            Current: false,
          });
        }
      }
      await muteSchema.updateMany(conditional, {
        Current: false,
      });
    }
    setTimeout(mutes, 1000 * 60)
  }
  async function bans() {
    const conditional = {
      Expires: { $lt: new Date() },
      Current: true,
    }
    const results = await banSchema.find(conditional);

    if (results && results.length) {
      for (const result of results) {
        const guild = await bot.guilds.fetch(result.GuildID);
        try {
          guild.members.unban(result.UserID);
        } catch (error) {
          await banSchema.updateMany(conditional, {
            Current: false,
          });
        }
      }
      await banSchema.updateMany(conditional, {
        Current: false,
      });
    }
    setTimeout(bans, 1000 * 60)
  }
  bans()
  mutes()
};