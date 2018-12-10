exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply("you need to have the `Manage Messages` permission on this server to purge the chat!");
  if (!message.guild.me.permissions.has("MANAGE_MESSAGES") && !message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES")) return message.reply("I don't have the `Manage Messages` permission!");
  if (args.length !== 0 && args[0].match(/^\d+$/)) {
    const numberOfMessages = parseInt(args[0]) + 1;
    message.channel.messages.fetch({
      limit: numberOfMessages,
    }).then(async (messages) => {
      message.channel.bulkDelete(messages);
      const purgeMessage = await message.channel.send(`Successfully purged ${args[0]} messages.`);
      return purgeMessage.delete({ timeout: 10000 });
    }).catch(console.error);
  } else {
    message.reply("you need to provide the amount of messages to purge!");
  }
};

exports.aliases = ["prune"];
