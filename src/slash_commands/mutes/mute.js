const MutedRole = require(`${process.cwd()}/src/functions/role.js`);
const Replace = require(`${process.cwd()}/src/functions/embedReplace.js`);
const Embeds = require(`${process.cwd()}/src/resources/embeds.json`);

module.exports = {
  name: 'mute',
  description: 'Mutes a user',
  async execute(interaction, bot, { muteSchema, roleSchema }) {

    const MissingPermission = new Replace(Embeds.MissingPermission, { PERMISSION: '``MANAGE_ROLES`` or ``MUTE_MEMBERS``', PUNISH: 'mute users' });
    if (!interaction.member.permissions.has('MANAGE_ROLES') || !interaction.member.permissions.has('MUTE_MEMBERS')) return interaction.reply({ content: null, embeds: [MissingPermission], ephemeral: true });
    const target = interaction.options.get("user");

    const NotFound = new Replace(Embeds.NotFound, { USER: target.user });
    if (!target.member) return interaction.reply({ content: null, embeds: [NotFound], ephemeral: true });

    const LackingPermission = new Replace(Embeds.LackingPermission, { USER: target.user, PUNISH: 'mute' });
    if (!target.member.manageable) return interaction.reply({ content: null, embeds: [LackingPermission], ephemeral: true });

    let hasPerms = interaction.guild.me.permissions.has("MANAGE_ROLES")
    if (!hasPerms) return interaction.reply({ content: null, embeds: [Embeds.CantMakeMuted] });

    const AlreadyMuted = new Replace(Embeds.AlreadyPunished, { USER: target.user, PUNISHED: 'muted' });
    const roleID = await MutedRole(interaction, roleSchema);
    if (target.member.roles.cache.find(m => m.id === roleID)) return interaction.reply({ content: null, embeds: [AlreadyMuted], ephemeral: true });

    let Reason;
    if (interaction.options.get("reason")) {
      Reason = "The reason stated was " + interaction.options.get("reason").value
    } else {
      Reason = "There was no reason given"
    }

    const ID1 = Math.random().toString().slice(2, 19);
    const ID2 = Math.random().toString().slice(2, 19);
    const Button = new Replace(Embeds.RowActive, { ID: ID1, ID2: ID2 });
    const Certain = new Replace(Embeds.Certain, { TITLE: 'Mute Member', PUNISH: 'mute', USER: target.user });

    const message = await interaction.reply({ content: null, embeds: [Certain], components: [Button], fetchReply: true, ephemeral: true });
    const collector = message.createMessageComponentCollector();

    collector.on('collect', async i => {
      if (i.customId == ID2) {
        collector.stop();
        await i.update({ content: null, embeds: [Certain], components: [Embeds.RowDisable] });

        const OperationStopped = new Replace(Embeds.OperationStopped, { USER: target.user, PUNISHED: 'muted' });
        return interaction.followUp({ content: null, embeds: [OperationStopped] });
      } else if (i.customId == ID1) {
        collector.stop();

        await new muteSchema({
          UserID: target.user.id,
          StaffID: interaction.user.id,
          GuildID: interaction.guild.id,
          Reason,
          Expires: null,
          Current: true,
        }).save().then(async e => {

          const UserPunished = new Replace(Embeds.UserPunished, { PUNISHED: 'muted', REASON: Reason });
          target.user.send({ content: null, embeds: [UserPunished] }).catch(err => { });
          await i.update({ content: null, embeds: [Certain], components: [Embeds.RowDisable] });

          const MemberPunished = new Replace(Embeds.MemberPunished, { PUNISH: 'Muted', USER: target.user, PUNISHED: 'muted' });
          target.member.roles.add(roleID);
          return interaction.followUp({ content: null, embeds: [MemberPunished] });
        })
      }
    })
  },
};