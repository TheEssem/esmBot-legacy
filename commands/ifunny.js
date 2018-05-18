const request = require("request");
const gm = require("gm").subClass({
  imageMagick: true
});

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const image = client.getImage(message);
  message.channel.startTyping();
  const ifunnyWatermark = "./assets/images/ifunnywatermark.png";
  gm(request(image)).size((error, size) => {
    if (error) throw new Error(error);
    gm(request(image)).append(ifunnyWatermark).gravity("South").resize(size.width, null).strip().stream((error, stdout) => {
      if (error) throw new Error(error);
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: stdout,
          name: "ifunny.png"
        }]
      });
    });
  });
};
