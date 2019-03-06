exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const guildConf = client.settings.get(message.guild.id) || client.defaults;
  message.reply(`my command list can be found here: https://essem.space/esmBot/commands.html\nThis server's prefix is \`${guildConf.prefix}\`.`);
};

exports.aliases = [];
