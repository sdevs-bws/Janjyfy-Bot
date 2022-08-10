const { resolve } = require('path');
const { readdir } = require('fs').promises;
module.exports = (client) => {
  
  async function getFiles(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return Array.prototype.concat(...files);
  }
  
  async function run(){
      const files = await getFiles(`${process.cwd()}/src/buttons/`);
      const jsFiles = files.filter((f) => f.split(`.`).pop() === "js")
      if (jsFiles.length <= 0)
          return console.log(`[${`Loader`}] No loadable Buttons detected`);
      console.log(`[${`Loader`}] Loading ${jsFiles.length} Buttons`);
      jsFiles.forEach((fileName, index) => {
          let props = fileName;
          console.log(`[${`Loader`}] ${fileName} Buttons loaded (${index + 1})`);
          client.interactions.set(props.help.custom_id, props);
      });
  }
  run();

  client.on(`interactionCreate`, async (interaction) => {
    if (interaction.isButton()) {
      var cmd = client.interactions.get(interaction.customId);
      if (cmd) cmd.run(client, interaction);
    }
  });
};