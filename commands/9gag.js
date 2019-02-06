const request = require("request");
const gm = require("@tohru/gm").subClass({
  imageMagick: true
});

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const image = await client.getImage(message).catch(error => {
    message.reply("you need to provide an image to add a 9GAG watermark!");
    console.log(error);
  });
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
  }
};

exports.aliases = ["ninegag", "gag"];
