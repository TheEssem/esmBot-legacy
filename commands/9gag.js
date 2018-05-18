const request = require("request");
const gm = require("gm").subClass({
  imageMagick: true
});

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const image = client.getImage(message);
  if (image !== undefined) {
    message.channel.startTyping();
    const ninegagWatermark = "./assets/images/9gagwatermark.png";
    gm(request(image)).composite(ninegagWatermark).gravity("East").strip().stream((error, stdout) => {
      if (error) throw new Error(error);
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: stdout,
          name: "9gag.png"
        }]
      });
    });
  } else {
    message.reply("you need to provide a PNG or JPEG file to add a 9GAG watermark!");
  }
};
