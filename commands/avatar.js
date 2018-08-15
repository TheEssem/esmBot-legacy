exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (args.length === 0) {
    message.channel.send(message.author.displayAvatarURL());
  } else if (message.mentions.users.first() !== undefined) {
    message.channel.send(message.mentions.users.first().displayAvatarURL());
  } else {
    message.channel.send(message.author.displayAvatarURL());
  }
};
