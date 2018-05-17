exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const fullwidthText = args.join(" ").toFullWidth();
  message.channel.send(fullwidthText);
};
