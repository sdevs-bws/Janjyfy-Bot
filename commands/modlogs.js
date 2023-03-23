const modLogModel = require(`${process.cwd()}/database/models/modlog.js`);

module.exports = {
    name: "modlogs",
    description: "sets the modlog channel",
    category: "config",
    options: [
        {
            name: "enable",
            description: "enable the modlogs system",
            type: 1,
            options: [
                {
                    name: "channel",
                    description: "modlogs channel",
                    type: 7,
                    required: true,
                },
            ],
        },
        {
            name: "disable",
            description: "disable the modlogs system",
            type: 1,
        },
    ],

    run: async (client, interaction) => {
        const data =
        (await modLogModel.findOne({
            Guild: interaction.guildId,
        })) ||
        (await modLogModel.create({
            Guild: interaction.guildId,
        }));
        channel = interaction.options.getChannel("channel");
        command = interaction.options.getSubcommand();

        if (command === "enable") {
            if (data.Channel === channel.id)
                return interaction.reply(`❌ | This is already the \`\`modlogs\`\` channel`);
                

            data.Channel = channel.id;
            data.Enabled = true;
            data.save();

            interaction.reply(`✅ | Logs have been \`\`set\`\` to ${channel}`);
        } else if (command === "disable") {
            if (data.Enabled !== true)
                return interaction.reply(`❌ | Modlogs system is \`\`already\`\` disabled`);

            data.Channel = null;
            data.Enabled = false;
            data.save();

            interaction.reply(`✅ | Modlogs system \`\`has\`\` been disabled`);
        }
    },
};