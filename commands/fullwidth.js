const uax11 = require("uax11");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const fullwidthText = uax11.toFullwidth(args.join(" "));
  message.channel.send(fullwidthText);
};
