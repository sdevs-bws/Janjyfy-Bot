const { MessageEmbed } = require("discord.js");
const colors = require(`${process.cwd()}/janjy.colors.js`);
const modlogModel = require(`${process.cwd()}/database/models/modlog.js`);

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
        reason =
            interaction.options.getString("reason") || "`No Reason Provided`";

        if (amount < 0 || amount > 100)
            return interaction.followUp({
                content: `❌ | You can only delete 100 messages at once`,
            });

        if (!channel.isText())
            return interaction.followUp({
                content: `❌ | Please select a text channel`,
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
            return interaction.followup({
                content: `❌ | Unable to find any messages from ${member}`,
            });
        } else {
            await channel.bulkDelete(messages, true).then((messages) => {
                const embed = new MessageEmbed()
                    .setDescription(
                        `✅ | Successfully deleted **${messages.size}** message(s).`
                    )
                    .addField("Channel", `${channel}`, true)
                    .addField("Message Count", `\`${messages.size}\``, true)
                    .addField("Reason", `${reason}`, true)
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
                interaction
                    .editReply({
                        embeds: [embed],
                    })
                    .catch(() => {});
            });
        }
    }
};