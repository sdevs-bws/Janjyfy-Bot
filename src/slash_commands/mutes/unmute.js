const Replace = require(`${process.cwd()}/src/functions/embedReplace.js`);
const Embeds = require(`${process.cwd()}/src/resources/embeds.json`);

module.exports = {
  name: 'unmute',
  description: 'Unmutes a user',
  async execute(interaction, bot, { muteSchema, roleSchema }) {

    const MissingPermission = new Replace(Embeds.MissingPermission, { PERMISSION: '``MANAGE_ROLES`` or ``MUTE_MEMBERS``', PUNISH: 'Unmute users' });
    if (!interaction.member.permissions.has('MANAGE_ROLES') || !interaction.member.permissions.has('MUTE_MEMBERS')) return interaction.reply({ content: null, embeds: [MissingPermission], ephemeral: true });
    const target = interaction.options.get("user");

    const NotFound = new Replace(Embeds.NotFound, { USER: target.user });
    if (!target.member) return interaction.reply({ content: null, embeds: [NotFound], ephemeral: true });

    const LackingPermission = new Replace(Embeds.LackingPermission, { USER: target.user, PUNISH: 'Unmute' });
    if (!target.member.manageable) return interaction.reply({ content: null, embeds: [LackingPermission], ephemeral: true });

    let GuildRole = await roleSchema.findOne({ GuildID: interaction.guild.id });
    if (!GuildRole) return interaction.reply({ content: null, embeds: [Embeds.CantManage] });

    let mutedRole = await interaction.guild.roles.fetch(GuildRole.RoleID);
    if (!mutedRole || !mutedRole.editable) return interaction.reply({ content: null, embeds: [Embeds.CantManage] });

    const NotPunished = new Replace(Embeds.NotPunished, { USER: target.user, PUNISHED: 'muted' });
    if (!target.member.roles.cache.find(m => m.id === mutedRole.id)) return interaction.reply({ content: null, embeds: [NotPunished], ephemeral: true });

    const ID1 = Math.random().toString().slice(2, 19);
    const ID2 = Math.random().toString().slice(2, 19);
    const Button = new Replace(Embeds.RowActive, { ID: ID1, ID2: ID2 });
    const Certain = new Replace(Embeds.Certain, { TITLE: 'Unmute Member', PUNISH: 'Unmute', USER: target.user });

    const message = await interaction.reply({ content: null, embeds: [Certain], components: [Button], fetchReply: true, ephemeral: true });
    const collector = message.createMessageComponentCollector();

    collector.on('collect', async i => {
      if (i.customId == ID2) {
        collector.stop();
        await i.update({ content: null, embeds: [Certain], components: [Embeds.RowDisable] });

        const OperationStopped = new Replace(Embeds.OperationStopped, { USER: target.user, PUNISHED: 'Unmuted' });
        return interaction.followUp({ content: null, embeds: [OperationStopped] });
      } else if (i.customId == ID1) {
        collector.stop();

        await muteSchema.findOneAndUpdate(
          { UserID: target.user.id },
          { Current: false }
        ).then(async e => {
          await i.update({ content: null, embeds: [Certain], components: [Embeds.RowDisable] });

          const MemberPunished = new Replace(Embeds.MemberPunished, { PUNISH: 'Unmuted', USER: target.user, PUNISHED: 'Unmuted' });
          target.member.roles.remove(mutedRole);
          return interaction.followUp({ content: null, embeds: [MemberPunished] });
        })
      }
    })
  },
};
