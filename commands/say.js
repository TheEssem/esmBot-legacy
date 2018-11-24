exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (args.length !== 0) {
    if (message.content.indexOf("@everyone") > -1 || message.content.indexOf("@here") > -1) {
      message.channel.send("No.");
    } else {
      message.channel.send(args.join(" "));
    }
  } else {
    message.reply("you need to give me something to say!");
  }
};

exports.aliases = ["talk"];
