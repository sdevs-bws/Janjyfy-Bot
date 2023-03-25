require('dotenv').config();
const discord = require('discord.js');
const { REST } = require("@discordjs/rest");
const client = new discord.Client( { disableEveryone: true, intents: 32767 } );
const config = require('./janjy.config.js');
const { Routes } = require("discord-api-types/v9");
const colors = require('./janjy.colors.js');
const fs = require('fs');

const _commands = [];

client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.categories = fs.readdirSync('./commands/');

const cooldowns = new discord.Collection();

require("./database/connect.js");
require("./checks/c4.js")(client);

global.commands = _commands;
const rest = new REST({ version: "9" }).setToken(process.env.token);

client.once("ready", async () => {
  try {
    console.log("[✅] Loading application commands!");
    await rest.put(Routes.applicationCommands(client.user.id), { body: _commands });
    console.log("[✅] Loaded application commands!");
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
      };require('dotenv').config();
const discord = require('discord.js');
const { REST } = require("@discordjs/rest");
const client = new discord.Client( { disableEveryone: true, intents: 32767 } );
const config = require('./janjy.config.js');
const { Routes } = require("discord-api-types/v9");
const colors = require('./janjy.colors.js');
const fs = require('fs');

const _commands = [];

client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.categories = fs.readdirSync('./commands/');

const cooldowns = new discord.Collection();

require("./database/connect.js");

global.commands = _commands;
const rest = new REST({ version: "9" }).setToken(process.env.token);

client.once("ready", async () => {
  try {
    console.log("[✅] Loading application commands!");
    await rest.put(Routes.applicationCommands(client.user.id), { body: _commands });
    console.log("[✅] Loaded application commands!");
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
        const g = new discord.EmbedBuilder()
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
    console.log(`[✅] ${client.user.tag} is online!`);
    client.user.setActivity(`/help | ${client.guilds.cache.size} Server(s)`, { type: 'PLAYING' });
    client.user.setStatus('online');

})

if (!process.env.token) throw new Error("Please provide a token in the .env file or if you are on repl.it, please provide a secret named token!");
if (!process.env.mongo) throw new Error("Please provide a mongo url in the .env file or if you are on repl.it, please provide a secret named mongo!");

client.login(process.env.token);
require("./checks/c4.js")(client);
    });
  });

  client.on("interactionCreate", async interaction => {
    try {
  
      if (!interaction.isCommand()) return;
      
      if (!config.owners.includes(interaction.user.id)) {
      if (config.maintenance_mode === true) { 
        const g = new discord.EmbedBuilder()
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
    console.log(`[✅] ${client.user.tag} is online!`);
    client.user.setActivity(`/help | ${client.guilds.cache.size} Server(s)`, { type: 'PLAYING' });
    client.user.setStatus('online');

})

if (!process.env.token) throw new Error("Please provide a token in the .env file or if you are on repl.it, please provide a secret named token!");
if (!process.env.mongo) throw new Error("Please provide a mongo url in the .env file or if you are on repl.it, please provide a secret named mongo!");

client.login(process.env.token);
