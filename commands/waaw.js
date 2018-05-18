const request = require("request");
const tempy = require("tempy");
const gm = require("gm").subClass({
  imageMagick: true
});

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const image = client.getImage(message);
  const waawCrop = tempy.file({extension: "png"});
  const waawFlip = tempy.file({extension: "png"});
  message.channel.startTyping();
  gm(request.get(image)).gravity("East").crop("50%", 0).strip().write(waawCrop, (error) => {
    if (error) throw new Error(error);
    gm(waawCrop).flop().strip().write(waawFlip, (error) => {
      if (error) throw new Error(error);
      gm(waawFlip).append(waawCrop, true).strip().stream((error, stdoutFinal) => {
        if (error) throw new Error(error);
        message.channel.stopTyping();
        message.channel.send({
          files: [{
            attachment: stdoutFinal,
            name: "waaw.png"
          }]
        });
      });
    });
  });
};
