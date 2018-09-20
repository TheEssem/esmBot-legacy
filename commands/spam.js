exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (args.length !== 0) {
    message.channel.send(args.join(" ").repeat(2000).substring(0, 2000));
  } else {
    message.reply("you need to specify what you want to spam!");
  }
};
