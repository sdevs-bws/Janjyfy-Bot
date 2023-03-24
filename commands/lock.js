const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const modlogModel = require(`${process.cwd()}/database/models/modlog.js`);
const colors = require(`${process.cwd()}/janjy.colors.js`);

module.exports = {
  name: "lock",
  description: "locks a channel",
  options: [
    {
      name: "channel",
      type: 7,
      description: "the channel to lock",
      required: true,
    },
    {
      name: "reason",
      type: 3,
      description: "the reason for locking the channel",
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const channel = interaction.options.getChannel("channel");
    const reason = interaction.options.getString("reason");
    const roleFetch = interaction.guild.roles.cache.find(
      (role) => role.name === "@everyone"
    );

    if (!channel) {
      interaction.reply({
        content: "❌ | I could not \`\`find\`\` that channel!",
        ephemeral: true,
      });
      return;
    }
    if (!reason) {
      interaction.reply({
        content: "❌ | Please provide a reason for locking the channel!",
        ephemeral: true,
      });
      return;
    }

    if (!channel.permissionsFor(roleFetch).has(PermissionsBitField.Flags.SendMessages)) {
      interaction.reply({
        content: "❌ | That channel is already \`\`locked\`\`!",
        ephemeral: true,
      });
      return;
    }

    await channel.permissionOverwrites.edit(roleFetch.id, {
      SendMessages: false,
    });
    interaction.reply({
      content: `✅ | \`\`${channel.name}\`\` has been \`\`locked\`\` for reason: \`\`${reason}\`\``,
      ephemeral: true,
    });

    const mog_log_embed = new EmbedBuilder()
      .setTitle("Lock Channel")
      .setColor(colors.main)
      .setDescription(
        `\`\`${interaction.user.tag}\`\` has \`\`locked\`\` the channel: \`\`${channel}\`\` for reason: \`\`${reason}\`\``
      )
      .setFooter({ text: `Locked by: ${interaction.user.tag}` });

    const modlog = await modlogModel.findOne({ where: { Guild: interaction.guild.id } });
    if (modlog.Enabled == true) {
      interaction.guild.channels.cache
        .get(modlog.Channel)
        .send({ embeds: [mog_log_embed] });
    }
    if (modlog.Enabled == false) {
      return;
    }
  },
};