exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (args.length === 0) {
    message.channel.send(message.author.displayAvatarURL({size: 1024}));
  } else if (message.mentions.users.first() !== undefined) {
    message.channel.send(message.mentions.users.first().displayAvatarURL({size: 1024}));
  } else {
    message.channel.send(message.author.displayAvatarURL({size: 1024}));
  }
};
