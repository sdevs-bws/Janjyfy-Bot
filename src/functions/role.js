async function MutedRole(interaction, roleSchema) {
    let GuildRole = await roleSchema.findOne({ GuildID: interaction.guild.id });
  
    if (!GuildRole) {
      let NewRole = await interaction.guild.roles.create({
        name: 'Muted',
        color: "#95a5a6",
        reason: 'There was no muted role',
      });
  
      interaction.guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').forEach(async (channel) => {
        await channel.permissionOverwrites.create(NewRole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
        })
    });
      await new roleSchema({ RoleID: NewRole.id, GuildID: interaction.guild.id }).save();
      return NewRole.id
    }
    let mutedRole = await interaction.guild.roles.fetch(GuildRole.RoleID);
  
    if (!mutedRole || !mutedRole.editable) {
      let NewRole = await interaction.guild.roles.create({
        name: 'Muted',
        color: '#95a5a6',
        reason: 'There was no muted role',
      });
  
      interaction.guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').forEach(async (channel) => {
        await channel.permissionOverwrites.create(NewRole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
        })
    });
  
      await roleSchema.findOneAndUpdate({ GuildID: interaction.guild.id }, { RoleID: NewRole.id });
      return NewRole.id
    }
  
    return GuildRole.RoleID
  }
  
  module.exports = MutedRole