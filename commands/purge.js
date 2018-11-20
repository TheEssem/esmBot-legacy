exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply("you need to have the `Manage Messages` permission on this server to purge the chat!");
  if (!message.guild.me.permissions.has("MANAGE_MESSAGES") && !message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES")) return message.reply("I don't have the `Manage Messages` permission!");
  if (args.length !== 0 && args[0].match(/^\d+$/)) {
    message.channel.messages.fetch({
      limit: 100,
    }).then((messages) => {
      messages = messages.array().slice(0, args[0] + 1);
      message.channel.bulkDelete(messages);
      return message.channel.send(`Successfully purged ${args[0]} messages.`);
    }).catch(console.error);
  } else {
    message.reply("you need to provide the amount of messages to purge!");
  }
};

exports.aliases = ["prune"];
