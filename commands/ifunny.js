const request = require("request");
const gm = require("@tohru/gm").subClass({
  imageMagick: true
});

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const image = await client.getImage(message).catch(error => {
    message.reply("you need to provide an image to add an iFunny watermark!");
    console.log(error);
  });
  if (image !== undefined) {
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
  }
};

exports.aliases = [];
