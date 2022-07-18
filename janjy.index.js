const {Client, Collection, Intents } = require("discord.js");
global.mongoose = require('mongoose');
const client = new Client({ intents: 32767 });
const { readdirSync, fs } = require('fs')
const config = require("./src/config/janjy.config.js");
client.config = config;


/* Load all events (discord based) */
const handlersFiles = readdirSync('./src/handlers');
for (const file of handlersFiles) {
  client[file.split('.')[0]] = new Collection()
  require(`./src/handlers/${file}`)(client)
}

// Connect to the MongoDB
mongoose.connect(config.mongo).then(() => {
  console.log("[!]:  ✅  Mongoose successfully connected.");
}).catch(err => console.log("[!]:  ❌  An error occurred while connecting mongoose.", err));

// Login through the client
client.login(config.token);
