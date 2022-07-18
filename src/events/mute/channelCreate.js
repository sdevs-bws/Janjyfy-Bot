const roleSchema = require(`${process.cwd()}/src/schemas/role-schema.js`);
const { Permissions } = require('discord.js');

module.exports = {
  name: 'channelCreate',
  once: false,
  async execute(bot, channel) {

    let x = channel.guild.me.joinedTimestamp;
    if (x + 1000 > new Date()) return;

    let GuildRole = await roleSchema.findOne({ GuildID: channel.guild.id });
    if (!GuildRole) return;

      await channel.permissionOverwrites.create(GuildRole.RoleID, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
      })
  },
};