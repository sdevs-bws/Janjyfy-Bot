const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const colors = require(`${process.cwd()}/janjy.colors.js`);

module.exports = {
    name: "purge",
    description: "deletes messages",
    options: [
        {
            name: "amount",
            description: "Select the amount messages to delete",
            type: 4,
            required: true,
        },
        {
            name: "channel",
            description: "channel to delete messages",
            type: 7,
            required: false,
        },
        {
            name: "target",
            description: "Select a target to clear their messages",
            type: 6,
            required: false,
        },
        {
            name: "reason",
            description: "reason for this purge",
            type: 3,
            required: false,
        },
    ],

    run: async (client, interaction) => {
        const channel = interaction.options.getChannel("channel") || interaction.channel;
        member = interaction.options.getMember("target");
        amount = interaction.options.getInteger("amount");
        reason = interaction.options.getString("reason") || "`No Reason Provided`";

        if (amount < 0 || amount > 100)
            return interaction.reply({
                content: `❌ | Please select a number between 1 and 100`,
                ephemeral: true
            });

        if (!channel.isTextBased())
            return interaction.reply({
                content: `❌ | Please select a text channel`,
                ephemeral: true
            });

        let messages;
        if (member) {
            messages = (
                await channel.messages.fetch({
                    limit: amount,
                })
            ).filter((m) => m.member.id === member.id);
        } else messages = amount;

        if (messages.size === 0) {
            return interaction.reply({
                content: `❌ | Unable to find any messages from ${member}`,
                ephemeral: true
            });
        } else {
            await channel.bulkDelete(messages, true).then((messages) => {
                const embed = new EmbedBuilder()
                    .setDescription(`✅ | Successfully deleted **${messages.size}** message(s).`)
                    .addFields([
                        { name: "Channel", value: `${channel}`, inline: false },
                        { name: "Message Count", value: `\`${messages.size}\``, inline: false },
                        { name: "Reason", value: `${reason}`, inline: false }
                    ])
                    .setTimestamp()
                    .setColor(colors.green);

                    interaction.reply({ embeds: [embed] });

                if (member) {
                    embed
                        .spliceFields(1, 1, {
                            name: "Found Messages",
                            value: `\`${messages.size}\``,
                            inline: true,
                        })
                        .spliceFields(1, 0, {
                            name: "Member",
                            value: `${member}`,
                            inline: true,
                        });
                }
                interaction.editReply({
                        embeds: [embed],
                    }) .catch(() => {});
            });
        }
    }
};