const Replace = require(`${process.cwd()}/src/functions/embedReplace.js`);
const Embeds = require(`${process.cwd()}/src/resources/embeds.json`);

module.exports = {
  name: 'purge',
  description: 'Removes up to 100 message',
  async execute(interaction, bot) {

    const MissingPermission = new Replace(Embeds.MissingPermission, { PERMISSION: '``MANAGE_MESSAGES``', PUNISH: `purge ${interaction.channel}` });
    if (!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.reply({ content: null, embeds: [MissingPermission], ephemeral: true });
    const amount = interaction.options.get("amount");
    const member = interaction.guild.members.cache.get(bot.user.id);

    const LackingPermission = new Replace(Embeds.LackingPermission, { USER: interaction.channel, PUNISH: 'purge' });
    if (!member.permissions.has('MANAGE_MESSAGES')) return interaction.reply({ content: null, embeds: [LackingPermission], ephemeral: true });

    const PurgeError = new Replace(Embeds.PurgeError, { AMOUNT: amount.value });
    if (amount.value > 100 || amount.value < 0) return interaction.reply({ content: null, embeds: [PurgeError], ephemeral: true });

    const ID1 = Math.random().toString().slice(2, 19);
    const ID2 = Math.random().toString().slice(2, 19);
    const Button = new Replace(Embeds.RowActive, { ID: ID1, ID2: ID2 });
    const Certain = new Replace(Embeds.Certain, { TITLE: 'Purge Channel', PUNISH: 'purge', USER: interaction.channel });

    const message = await interaction.reply({ content: null, embeds: [Certain], components: [Button], fetchReply: true, ephemeral: true });
    const collector = message.createMessageComponentCollector();

    collector.on('collect', async i => {
      if (i.customId == ID2) {
        collector.stop();
        await i.update({ content: null, embeds: [Certain], components: [Embeds.RowDisable] });

        const OperationStopped = new Replace(Embeds.OperationStopped, { USER: interaction.channel, PUNISHED: 'purged' });
        return interaction.followUp({ content: null, embeds: [OperationStopped] });
      } else if (i.customId == ID1) {
        collector.stop();

        await i.update({ content: null, embeds: [Certain], components: [Embeds.RowDisable] });

        let messagecount = amount.value.toString();
        const channel = await bot.channels.fetch(interaction.channel.id);
        interaction.channel.messages.fetch({ limit: messagecount })
          .then(messages => {
            channel.bulkDelete(messages, true).then((message) => {
              const ChannelPurged = new Replace(Embeds.ChannelPurged, { AMOUNT: message.size });
              return interaction.followUp({ content: null, embeds: [ChannelPurged] });
            })
          })
      }
    })
  },
};
