exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const guildConf = client.settings.get(message.guild.id) || client.defaults;
  message.reply(`my command list can be found here: <https://gist.github.com/TheEssemCraft/a0597f9603177a2df1d8398aa8b78729>\nThis server's prefix is \`${guildConf.prefix}\`.`);
};
