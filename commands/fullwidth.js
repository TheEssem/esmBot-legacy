exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (args.length == 0) {
    message.reply("you need to provide a message to convert!");
  } else {
    const fullwidthText = args.join(" ").toFullWidth();
    message.channel.send(fullwidthText);
  }
};

exports.aliases = ["aesthetic", "aesthetics", "aes"];
