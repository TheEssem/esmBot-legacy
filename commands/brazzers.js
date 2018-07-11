const request = require("request");
const gm = require("gm").subClass({
  imageMagick: true
});

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const image = client.getImage(message);
  if (image !== undefined) {
    message.channel.startTyping();
    const brazzersWatermark = "./assets/images/brazzerswatermark.png";
    gm(request(image)).size((error, size) => {
      if (error) throw new Error(error);
      gm(request(image)).composite(brazzersWatermark).gravity("SouthEast").resize(size.width, null).strip().stream((error, stdout) => {
        if (error) throw new Error(error);
        message.channel.stopTyping();
        message.channel.send({
          files: [{
            attachment: stdout,
            name: "brazzers.png"
          }]
        });
      });
    });
  } else {
    message.reply("you need to provide a PNG or JPEG file to add a Brazzers watermark!");
  }
};
