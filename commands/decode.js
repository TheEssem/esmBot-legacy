const base64 = require("js-base64").Base64;

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const b64Decoded = base64.decode(args.join(" "));
  message.channel.send(`\`\`\`\n${b64Decoded}\`\`\``);
};

exports.aliases = ["b64decode", "base64decode"];
