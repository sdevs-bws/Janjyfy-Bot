const discord = require('discord.js');
const { REST } = require("@discordjs/rest");
const client = new discord.Client( { disableEveryone: true, intents: 32767 } );
const config = require('./janjy.config.js');
const { Routes } = require("discord-api-types/v9");
const colors = require('./janjy.colors.js');
const fs = require('fs');
const moment = require('moment');
const ms = require('ms');

const _commands = [];

client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.categories = fs.readdirSync('./commands/');

const cooldowns = new discord.Collection();

require("./database/connect.js");

global.commands = _commands;
const rest = new REST({ version: "9" }).setToken(config.token);

client.once("ready", async () => {
  try {
    console.log("✅ Loading application commands!");
    await rest.put(Routes.applicationCommands(client.user.id), { body: _commands });
    console.log("✅ Loaded application commands!");
  } catch (err) {
    console.error(err);
  };
});


fs.readdir(config.cmdDir, (err, commands) => {
    if (err) throw new Error(err);
    commands.forEach(async command => {
      try {
        const _cmdFile = require(config.cmdDir + "/" + command);
        const { name, description, options } = (
          typeof _cmdFile == "function" ?
            _cmdFile(client) :
            _cmdFile
        );
        _commands.push({ name, description, options });
      } catch (err) {
        console.error(err);
      };
    });
  });

  client.on("interactionCreate", async interaction => {
    try {
  
      if (!interaction.isCommand()) return;
      
      if (!config.owners.includes(interaction.user.id)) {
      if (config.maintenance_mode === true) { 
        const g = new discord.MessageEmbed()
        .setTitle(`> ❌ | The bot is currently under maintenance mode! And only admins can access all its commands right now! :hammer:`)
        .setColor(colors.main)
  
        await interaction.reply({ embeds: [g] })
  
      }
    };

      fs.readdir(config.cmdDir, (err, commands) => {
        if (err) throw new Error(err);
        commands.forEach(async command => {
          const _command = require(config.cmdDir + "/" + command);
          
  
          
          if (interaction.commandName.toLowerCase() === _command.name.toLowerCase()) _command.run(client, interaction);
        });
      });
    } catch (err) {
      console.error(err);
    };
  });


client.on('ready', () => {
    console.log(`✅ ${client.user.tag} is online!`);
    client.user.setActivity(`/help | ${client.guilds.cache.size} Server(s)`, { type: 'PLAYING' });
    client.user.setStatus('online');

}).on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    if(!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if(cmd) {
        if(cooldowns.has(cmd.help.name)) {
            if(cooldowns.get(cmd.help.name).has(message.author.id)) {
                const cd = cooldowns.get(cmd.help.name).get(message.author.id);
                if(moment().diff(cd, 'seconds') < 0) {
                    const timeLeft = ms(moment(cd).add(cmd.help.cooldown, 'seconds').diff(moment()));
                    return message.channel.send(`${message.author} you can use this command again in ${timeLeft} Seconds 💫`);
                }
            }
        }
        try {
            cooldowns.set(cmd.help.name, new discord.Collection());
            cmd.run(client, message, args);
        } catch(error) {
            console.log(error);
        }
        }
    }).on('messageDelete', async message => {
        if(message.author.bot) return;
        if(message.channel.type === 'dm') return;
        if(!message.content.startsWith(config.prefix)) return;
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        if(cmd) {
            if(cooldowns.has(cmd.help.name)) {
                if(cooldowns.get(cmd.help.name).has(message.author.id)) {
                    const cd = cooldowns.get(cmd.help.name).get(message.author.id);
                    if(moment().diff(cd, 'seconds') < 0) {
                        const timeLeft = ms(moment(cd).add(cmd.help.cooldown, 'seconds').diff(moment()));
                        return message.channel.send(`${message.author} you can use this command again in ${timeLeft} Seconds 💫`);
                    }
                }
            }
            try {
                cooldowns.set(cmd.help.name, new discord.Collection());
                cmd.run(client, message, args);
            } catch(error) {
                console.log(error);
            }
        }
    }).on('messageUpdate', async (oldMessage, newMessage) => {
        if(oldMessage.author.bot) return;
        if(oldMessage.channel.type === 'dm') return;
        if(!oldMessage.content.startsWith(config.prefix)) return;
        const args = oldMessage.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        if(cmd) {
            if(cooldowns.has(cmd.help.name)) {
                if(cooldowns.get(cmd.help.name).has(message.author.id)) {
                    const cd = cooldowns.get(cmd.help.name).get(message.author.id);
                    if(moment().diff(cd, 'seconds') < 0) {
                        const timeLeft = ms(moment(cd).add(cmd.help.cooldown, 'seconds').diff(moment()));
                        return message.channel.send(`${message.author} you can use this command again in ${timeLeft} Seconds 💫`);
                    }
                }
            }
            try {
                cooldowns.set(cmd.help.name, new discord.Collection());
                cmd.run(client, message, args);
            } catch(error) {
                console.log(error);
            }
        }
    }).on('message', async message => {
        if(message.author.bot) return;
        if(message.channel.type === 'dm') return;
        if(!message.content.startsWith(config.prefix)) return;
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        if(cmd) {
            if(cooldowns.has(cmd.help.name)) {
                if(cooldowns.get(cmd.help.name).has(message.author.id)) {
                    const cd = cooldowns.get(cmd.help.name).get(message.author.id);
                    if(moment().diff(cd, 'seconds') < 0) {
                        const timeLeft = ms(moment(cd).add(cmd.help.cooldown, 'seconds').diff(moment()));
                        return message.channel.send(`${message.author} you can use this command again in ${timeLeft} Seconds 💫`);
                    }
                }
            }
            try {
                cooldowns.set(cmd.help.name, new discord.Collection());
                cmd.run(client, message, args);
            } catch(error) {
                console.log(error);
            }
        }
    });

    if (!config.token) throw new Error("Please provide a token for the bot to login!");
    if (!config.mongo) throw new Error("Please provide a mongo url for the bot to connect to!");
    if (!config.owners) throw new Error("Please provide a owner id for the bot to work!");

    client.login(config.token);