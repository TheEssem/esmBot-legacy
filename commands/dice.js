exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (args.length === 0) {
    message.channel.send(`🎲 The dice landed on ${Array.from(Array(6).keys()).random() + 1}.`);
  } else {
    if (args[0].match(/^\d+$/)) {
      message.channel.send(`🎲 The dice landed on ${Array.from(Array(parseInt(args[0])).keys()).random() + 1}.`);
    } else {
      message.channel.send(`🎲 The dice landed on ${Array.from(Array(6).keys()).random() + 1}.`);
    }
  }
};

exports.aliases = ["roll", "die", "rng", "random"];
