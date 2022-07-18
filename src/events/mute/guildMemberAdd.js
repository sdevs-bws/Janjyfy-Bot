const muteSchema = require(`${process.cwd()}/src/schemas/mute-schema.js`);
const roleSchema = require(`${process.cwd()}/src/schemas/role-schema.js`);

module.exports = {
  name: 'guildMemberAdd',
  once: false,
  async execute(bot, member) {

    const currentMute = await muteSchema.findOne({
      UserID: member.user.id,
      GuildID: member.guild.id,
      Current: true,
    });

    if (!currentMute) return;
    const data = await roleSchema.findOne({ GuildID: member.guild.id });
    if (!data) return;

    member.roles.add(data.RoleID);
  },
};