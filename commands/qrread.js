const request = require("request");
//const pixel = require("pixel");
//const fs = require("fs");
//const jsQR = require("jsqr");
//const tempy = require("tempy");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const image = await client.getImage(message).catch(error => {
    message.reply("you need to provide an image to read a QR code!");
    console.log(error);
  });
  if (image !== undefined) {
    message.channel.startTyping();
    /*const imageFile = tempy.file({ extension: "png" });
    const imageRequest = request.get(image); //.pipe(fs.createWriteStream(imageFile));
    pixel(imageRequest).then((imageData) => {
      console.log(imageData);
      const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
      if (qrCode) {
        message.channel.stopTyping();
        return message.channel.send(`\`\`\`\n${qrCode.data}\`\`\``);
      } else {
        message.channel.stopTyping();
        return message.reply("there was an error while reading the QR code.");
      }
    }).catch(error => {
      message.channel.stopTyping();
      message.reply("there was an error while reading the QR code.");
      throw new Error(error);
    });*/
    const imageURI = encodeURI(image);
    request({ uri: `https://api.qrserver.com/v1/read-qr-code/?fileurl=${imageURI}`, json: true }, (error, response, body) => {
      if (error) throw new Error(error);
      if (body[0].symbol[0].error === null) {
        message.channel.stopTyping();
        message.channel.send(`\`\`\`\n${body[0].symbol[0].data}\`\`\``);
      } else {
        message.channel.stopTyping();
        message.reply("there was an error while reading the QR code.");
      }
    });
  }
};

exports.aliases = [];
