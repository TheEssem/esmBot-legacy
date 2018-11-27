exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (args.length !== 0) {
    if (message.content.indexOf("@everyone") > -1 || message.content.indexOf("@here") > -1) {
      message.channel.send("No.");
    } else {
      message.channel.send(args.join(" ").repeat(500).substring(0, 500));
    }
  } else {
    message.reply("you need to specify what you want to spam!");
  }
};

exports.aliases = [];
