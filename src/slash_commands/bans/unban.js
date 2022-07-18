const Replace = require(`${process.cwd()}/src/functions/embedReplace.js`);
const Embeds = require(`${process.cwd()}/src/resources/embeds.json`);

module.exports = {
  name: 'unban',
  description: 'Unbans a user',
  async execute(interaction, bot, { banSchema }) {

    const MissingPermission = new Replace(Embeds.MissingPermission, { PERMISSION: '``BAN_MEMBERS``', PUNISH: 'Unban users' });
    if (!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.reply({ content: null, embeds: [MissingPermission], ephemeral: true });
    const target = interaction.options.get("user");

    const banlist = await interaction.guild.bans.fetch();
    const banneduser = banlist.find(user => user.id === target.id);

    const NotPunished = new Replace(Embeds.NotPunished, { USER: target.user, PUNISHED: 'banned' });
    if (!banneduser) return interaction.reply({ content: null, embeds: [NotPunished], ephemeral: true });

    const ID1 = Math.random().toString().slice(2, 19);
    const ID2 = Math.random().toString().slice(2, 19);
    const Button = new Replace(Embeds.RowActive, { ID: ID1, ID2: ID2 });
    const Certain = new Replace(Embeds.Certain, { TITLE: 'Unban Member', PUNISH: 'Unban', USER: target.user });

    const message = await interaction.reply({ content: null, embeds: [Certain], components: [Button], fetchReply: true, ephemeral: true });
    const collector = message.createMessageComponentCollector();

    collector.on('collect', async i => {

      if (i.customId === ID2) {
        collector.stop();
        await i.update({ components: [Embeds.RowDisable], embeds: [Certain] });

        const OperationStopped = new Replace(Embeds.OperationStopped, { USER: target.user, PUNISHED: 'Unbanned' });
        return interaction.followUp({ content: null, embeds: [OperationStopped] });
      } else if (i.customId === ID1) {
        collector.stop();

        await banSchema.findOneAndUpdate(
          { UserID: target.user.id },
          { Current: false }
        ).then(async e => {
          await i.update({ components: [Embeds.RowDisable], embeds: [Certain] });

          const MemberUnbanned = new Replace(Embeds.MemberPunished, { PUNISH: 'Unbanned', USER: target.user, PUNISHED: 'Unbanned' });
          interaction.guild.members.unban(target.user.id);
          return interaction.followUp({ content: null, embeds: [MemberUnbanned] });
        })
      }
    });
  },
};