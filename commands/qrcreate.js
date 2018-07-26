const request = require("request");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  message.channel.startTyping();
  if (args.length > 0) {
    const qrOutput = request(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(args.join(" "))}`);
    message.channel.stopTyping();
    message.channel.send({
      files: [{
        attachment: qrOutput,
        name: "qr.png"
      }]
    });
  } else {
    message.channel.stopTyping();
    message.reply("you need to provide some text to generate a QR code!");
  }
};
