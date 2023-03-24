const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const config = require(`${process.cwd()}/janjy.config.js`);
const colors = require(`${process.cwd()}/janjy.colors.js`);
const osutils = require("os-utils");
const osu = require("node-os-utils");
const cpu = osu.cpu;
const os = osu.os;
const drive = osu.drive;
const proc = osu.proc;
const { dependencies } = require("../package.json");

module.exports = {
    name: "botinfo",
    description: "Get more informations about the bot.",
       
       run: async (client, interaction) => {
        const botuptime = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const osuptime = moment.duration(os.uptime()).format(" D [days], H [hrs], m [mins], s [secs]");

               const embed = new EmbedBuilder()
                .setTitle(`📄 Generic Information`)
                .setColor(colors.main)
                .setDescription(`> Global prefix: \`/\`\n`)
                .addFields([
                  { name: "<:crone:962312518741688341> Owner", value: "<@679407120743137300>", inline: false },
                  { name: "<:builder:962312525104439346> Developer", value: "<@679407120743137300> [[Website](https://janjytapyt.me)]", inline: false },
                  { name: "<:discord:939800230625439794> Guild Count", value: `\`${client.guilds.cache.size} guilds\``, inline: true },
                  { name: "<:admin:939801632537972796> User Count", value: `\`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members\``, inline: true },
                  { name: "<:levelup:939810915254140949> Channel Count", value: `\`${client.channels.cache.size} channels\``, inline: true },
                  { name: "💿 Operating System", value: "```" + osutils.platform() + " (" + os.arch() + ")```", inline: false },
                  { name: "📦 Tools", value: `\`\`\`Node.js: ${process.version} | Discord.js: ${dependencies["discord.js"].replace("^", "v")}\`\`\``, inline: false },
                  { name: "⏳ Uptime", value: `\`\`\`Bot: ${botuptime} | OS: ${osuptime}\`\`\``, inline: false },
                  { name: "📊 CPU", value: `\`\`\`Model: ${await cpu.model()} | Cores: ${await cpu.count()} | Usage: ${await cpu.usage()}%\`\`\``, inline: false },
                  { name: "🏓 Ping", value: `\`\`\`Bot: ${Math.round(client.ws.ping)}ms | API: ${(Date.now() - interaction.createdTimestamp).toString().replace(/-/g, "")}ms\`\`\``, inline: false },
                ])
                .setThumbnail(
                  client.user.displayAvatarURL({
                  dynamic: true,
                  format: "png",
                  size: 2048,
                 })
                )
                .setFooter({ text: config.footer });
               
                const row = new ActionRowBuilder()
                .addComponents(
                 new ButtonBuilder()
                  .setURL(`${config.supportDiscord}`)
                  .setLabel("Support")
                  .setStyle("Link")
                )
                .addComponents(
                 new ButtonBuilder()
                  .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
                  .setLabel("Invite me")
                  .setStyle("Link")
                )
               interaction.reply({ embeds: [embed], components: [row] });
      }
};