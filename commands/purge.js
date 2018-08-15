exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (args.length !== 0 && args[0].match(/^\d+$/)) {
    message.channel.messages.fetch({
      limit: 100,
    }).then((messages) => {
      messages = messages.array().slice(0, args[0]);
      message.channel.bulkDelete(messages);
      return message.channel.send(`Successfully purged ${args[0]} messages.`);
    }).catch(console.error);
  } else {
    message.reply("you need to provide the amount of messages to purge!");
  }
};
