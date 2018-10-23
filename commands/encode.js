const base64 = require("js-base64").Base64;

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const b64Encoded = base64.encode(args.join(" "));
  message.channel.send(`\`\`\`\n${b64Encoded}\`\`\``);
};

exports.aliases = ["b64", "b64encode", "base64", "base64encode"];
