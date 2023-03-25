module.exports = async (client) => {

  const guildId = "892311236878934016";

  const guild = await client.guilds.fetch(guildId);

  if (guild.members.cache.has(client.user.id)) {

    console.log("[✅] I'm in the " + guild.name + " server!");

  } else {

    console.log("[❌] I'm not in the " + guild.name + " Server so the Emojis wont load! Add me to the server by sending a message to JanjyTapYT#0001! || https://discord.gg/TbuHeKFUnJ");
  }

  console.log("[ℹ️] If the emojis don't load, please check if I have the 'USE_EXTERNAL_EMOJIS' permission in the server!");

};
