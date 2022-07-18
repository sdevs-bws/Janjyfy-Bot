const Embeds = require(`${process.cwd()}/src/resources/embeds.json`);
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'help',
    description: 'Shows all avalible commands and how to use them',
    async execute(interaction, bot) {

        const category = interaction.options.get("category");

        if (!category) return interaction.reply({ content: null, embeds: [Embeds.HelpEmbed], ephemeral: true });
        if (category.value == "catagory_mutes") return interaction.reply({ content: null, embeds: [Embeds.HelpMutes], ephemeral: true });
        if (category.value == "catagory_bans") return interaction.reply({ content: null, embeds: [Embeds.HelpBans], ephemeral: true });
        if (category.value == "catagory_moderation") return interaction.reply({ content: null, embeds: [Embeds.HelpModeration], ephemeral: true });
        if (category.value == "catagory_other") return interaction.reply({ content: null, embeds: [Embeds.HelpOther], ephemeral: true });
    },
};