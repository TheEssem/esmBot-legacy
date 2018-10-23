exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (args.length !== 0) {
    message.channel.send(args.join(" "));
  } else {
    message.reply("you need to give me something to say!");
  }
};

exports.aliases = ["talk"];
