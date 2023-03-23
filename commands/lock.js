const { MessageEmbed } = require('discord.js');
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
            required: true
        },
        {
            name: "reason",
            type: 3,
            description: "the reason for locking the channel",
            required: true
        }
    ],

    run: async (client, interaction) => {
         const channel = interaction.options.getChannel("channel");
         const reason = interaction.options.getString("reason");

         if (!channel) {
            interaction.reply(`❌ | I could not \`\`find\`\` that channel!`);
            return;
         }
         if (!reason) {
            interaction.reply(`❌ | You must provide a \`\`reason\`\` for locking the channel!`);
            return;
         }
         if (!channel.permissionsFor(interaction.guild.roles.everyone).has("SEND_MESSAGES")) {
            interaction.reply(`❌ | This channel is \`\`already\`\` locked!`)
            return;
         }

         channel.permissionOverwrites.edit(interaction.guild.id, {
            SEND_MESSAGES: false,
        });
         interaction.reply(`✅ | Successfully locked \`\`${channel.name}\`\` for Reason: \`\`${reason}\`\`!`);

         const mog_log_embed = new MessageEmbed()
         .setTitle("Lock Channel")
         .setColor(colors.main)
         .setDescription(`\`\`${interaction.user.tag}\`\` has \`\`locked\`\` the channel: \`\`${channel}\`\` for reason: \`\`${reason}\`\``)
         .setFooter({ text: `Locked by: ${interaction.user.tag}` });
 
     const modlog = await modlogModel.findOne({ where: { Guild: interaction.guild.id }})
     if (modlog.Enabled == true) {
        interaction.guild.channels.cache.get(modlog.Channel).send({ embeds: [mog_log_embed] });
     }
     if (modlog.Enabled == false) {
         return;
     }
    }
};