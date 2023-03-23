const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
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

               const embed = new MessageEmbed() // Prettier
                .setTitle(
                 `📄 Generic Information`,
                 interaction.guild.iconURL({
                  dynamic: true,
                  format: "png",
                 })
                )
                .setColor(colors.main)
                .setDescription(`> Global prefix: \`/\`\n`)
                .addField(`<:crone:962312518741688341> Owner`, `<@679407120743137300>`)
                .addField(`<:builder:962312525104439346> Developer`, `<@679407120743137300> [[Website](https://janjytapyt.me)]`)
                .setThumbnail(
                  client.user.displayAvatarURL({
                  dynamic: true,
                  format: "png",
                  size: 2048,
                 })
                )
                .addField(`<:discordlogo:962312528493428757> Guild Count`, `\`${client.guilds.cache.size} guilds\``, true)
                .addField(`<:user:962312519400194059> User Count`, `\`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members\``, true)
                .addField(`<:channel:962312519291133992> Channel Count`, `\`${client.channels.cache.size} channels\``, true)
                .addField(`💿 Operating System`, "```" + osutils.platform() + " (" + os.arch() + ")```", true)
                .addField(`📦 Tools`, `\`\`\`Node.js: ${process.version} | Discord.js: ${dependencies["discord.js"].replace("^", "v")}\`\`\``)
                .addField(`⏳ Uptime`, `\`\`\`Bot: ${botuptime}\nServer: ${osuptime}\`\`\``)
                // Yea, quite long strings XD
                .addField(`🏓 Ping`, `\`\`\`Bot: ${Math.round(client.ws.ping)}ms | API: ${(Date.now() - interaction.createdTimestamp).toString().replace(/-/g, "")}ms\`\`\``)
                .setFooter({ text: config.footer });
               
                const row = new MessageActionRow() // Prettier
                .addComponents(
                 new MessageButton() // Prettier
                  .setURL(`${config.supportDiscord}`)
                  .setEmoji('962312519400194059')
                  .setLabel("Support")
                  .setStyle("LINK")
                )
                .addComponents(
                 new MessageButton() // Prettier
                  .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
                  .setEmoji('962312519291133992')
                  .setLabel("Invite me")
                  .setStyle("LINK")
                )
                .addComponents(
                 new MessageButton() // Prettier
                  .setURL(`https://janjyfy.sdevs.org`)
                  .setEmoji('962312528371798026')
                  .setLabel("Website")
                  .setStyle("LINK")
                );
               interaction.reply({ embeds: [embed], components: [row] });
              }
             };