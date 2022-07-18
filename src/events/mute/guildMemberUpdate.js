const roleSchema = require(`${process.cwd()}/src/schemas/role-schema.js`);
const muteSchema = require(`${process.cwd()}/src/schemas/mute-schema.js`);

module.exports = {
  name: 'guildMemberUpdate',
  once: false,
  async execute(bot, oldMember, newMember) {

    let GuildRole = await roleSchema.findOne({ GuildID: oldMember.guild.id });
    if (!GuildRole) return;

    if (oldMember._roles.includes(GuildRole.RoleID) && !newMember._roles.includes(GuildRole.RoleID)) {

      const conditional = {
        UserID: oldMember.user.id,
        Current: true,
      }
      await muteSchema.updateMany(conditional, {
        Current: false,
      });
    }
  },
};