exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const guildConf = client.settings.get(message.guild.id) || client.defaults;
  message.reply(`my command list can be found here: <https://tinyurl.com/esmBotCommands>\nThis server's prefix is \`${guildConf.prefix}\`.`);
};
