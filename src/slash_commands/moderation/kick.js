const Replace = require(`${process.cwd()}/src/functions/embedReplace.js`);
const Embeds = require(`${process.cwd()}/src/resources/embeds.json`);

module.exports = {
  name: 'kick',
  description: 'Kicks a user',
  async execute(interaction, bot, { kickSchema }) {

    const MissingPermission = new Replace(Embeds.MissingPermission, { PERMISSION: '``KICK_MEMBERS``', PUNISH: 'kick users' });
    if (!interaction.member.permissions.has('KICK_MEMBERS')) return interaction.reply({ content: null, embeds: [MissingPermission], ephemeral: true });
    const target = interaction.options.get("user");

    const NotFound = new Replace(Embeds.NotFound, { USER: target.user });
    if (!target.member) return interaction.reply({ content: null, embeds: [NotFound], ephemeral: true });

    const LackingPermission = new Replace(Embeds.LackingPermission, { USER: target.user, PUNISH: 'kick' });
    if (!target.member.kickable) return interaction.reply({ content: null, embeds: [LackingPermission], ephemeral: true });

    let Reason;
    if (interaction.options.get("reason")) {
      Reason = "The reason stated was " + interaction.options.get("reason").value
    } else {
      Reason = "There was no reason given"
    }

    const ID1 = Math.random().toString().slice(2, 19);
    const ID2 = Math.random().toString().slice(2, 19);
    const Button = new Replace(Embeds.RowActive, { ID: ID1, ID2: ID2 });
    const Certain = new Replace(Embeds.Certain, { TITLE: 'Kick Member', PUNISH: 'kick', USER: target.user });

    const message = await interaction.reply({ content: null, embeds: [Certain], components: [Button], fetchReply: true, ephemeral: true });
    const collector = message.createMessageComponentCollector();

    collector.on('collect', async i => {
      if (i.customId == ID2) {
        collector.stop();
        await i.update({ content: null, embeds: [Certain], components: [Embeds.RowDisable] });

        const OperationStopped = new Replace(Embeds.OperationStopped, { USER: target.user, PUNISHED: 'kicked' });
        return interaction.followUp({ content: null, embeds: [OperationStopped] });
      } else if (i.customId == ID1) {
        collector.stop();

        await new kickSchema({
          UserID: target.user.id,
          StaffID: interaction.user.id,
          GuildID: interaction.guild.id,
          Reason,
        }).save().then(async e => {

          const UserPunished = new Replace(Embeds.UserPunished, { PUNISHED: 'kicked', REASON: Reason });
          target.user.send({ content: null, embeds: [UserPunished] }).catch(err => { });
          await i.update({ content: null, embeds: [Certain], components: [Embeds.RowDisable] });

          const MemberPunished = new Replace(Embeds.MemberPunished, { PUNISH: 'kicked', USER: target.user, PUNISHED: 'kicked' });
          setTimeout(() => {
            target.member.kick({ reason: Reason });
          }, 2500);
          return interaction.followUp({ content: null, embeds: [MemberPunished] });
        })
      }
    })
  },
};