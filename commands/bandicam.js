const request = require("request");
const gm = require("@tohru/gm").subClass({
  imageMagick: true
});

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const image = await client.getImage(message).catch(error => {
    message.reply("you need to provide an image to add a Bandicam watermark!");
    console.log(error);
  });
  if (image !== undefined) {
    message.channel.startTyping();
    const bandicamWatermark = "./assets/images/bandicamwatermark.png";
    gm(request(image)).size((error, size) => {
      if (error) throw new Error(error);
      gm(request(image)).composite(bandicamWatermark).gravity("North").resize(null, size.height).strip().stream((error, stdout) => {
        if (error) throw new Error(error);
        message.channel.stopTyping();
        message.channel.send({
          files: [{
            attachment: stdout,
            name: "bandicam.png"
          }]
        });
      });
    });
  }
};

exports.aliases = ["bandi"];
