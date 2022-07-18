const Replace = require(`${process.cwd()}/src/functions/embedReplace.js`);
const Embeds = require(`${process.cwd()}/src/resources/embeds.json`);

module.exports = {
  name: 'ban',
  description: 'Bans a user from the server.',
  async execute(interaction, bot, { banSchema }) {

    const MissingPermission = new Replace(Embeds.MissingPermission, { PERMISSION: '``BAN_MEMBERS``', PUNISH: 'ban users' });
    if (!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.reply({ content: null, embeds: [MissingPermission], ephemeral: true });
    const target = interaction.options.get("user");

    const NotFound = new Replace(Embeds.NotFound, { USER: target.user });
    if (!target.member) return interaction.reply({ content: null, embeds: [NotFound], ephemeral: true });

    const LackingPermission = new Replace(Embeds.LackingPermission, { USER: target.user, PUNISH: 'ban' });
    if (!target.member.bannable) return interaction.reply({ content: null, embeds: [LackingPermission], ephemeral: true });

    let Reason;
    if (interaction.options.get("reason")) {
      Reason = "The reason stated was " + interaction.options.get("reason").value;
    } else {
      Reason = "There was no reason given";
    }

    const ID1 = Math.random().toString().slice(2, 19);
    const ID2 = Math.random().toString().slice(2, 19);
    const Button = new Replace(Embeds.RowActive, { ID: ID1, ID2: ID2 });
    const Certain = new Replace(Embeds.Certain, { TITLE: 'Ban Member', PUNISH: 'ban', USER: target.user });

    const message = await interaction.reply({ content: null, embeds: [Certain], components: [Button], fetchReply: true, ephemeral: true });
    const collector = message.createMessageComponentCollector();

    collector.on('collect', async i => {
      if (i.customId == ID2) {
        collector.stop();
        await i.update({ content: null, embeds: [Certain], components: [Embeds.RowDisable] });

        const OperationStopped = new Replace(Embeds.OperationStopped, { USER: target.user, PUNISHED: 'banned' });
        return interaction.followUp({ content: null, embeds: [OperationStopped] });
      } else if (i.customId == ID1) {
        collector.stop();

        await new banSchema({
          UserID: target.user.id,
          StaffID: interaction.user.id,
          GuildID: interaction.guild.id,
          Reason,
          Expires: null,
          Current: true,
        }).save().then(async e => {
          collector.stop();

          const UserPunished = new Replace(Embeds.UserPunished, { PUNISHED: 'banned', REASON: Reason });
          target.user.send({ content: null, embeds: [UserPunished] }).catch(err => { });
          await i.update({ content: null, embeds: [Certain], components: [Embeds.RowDisable] });

          const MemberPunished = new Replace(Embeds.MemberPunished, { PUNISH: 'banned', USER: target.user, PUNISHED: 'banned' });
          setTimeout(() => {
            target.member.ban({ reason: Reason });
          }, 500);
          return interaction.followUp({ content: null, embeds: [MemberPunished] });
        })
      }
    })
  },
};
