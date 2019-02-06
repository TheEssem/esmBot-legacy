const request = require("request");
const tempy = require("tempy");
const fs = require("fs");
const gm = require("@tohru/gm").subClass({
  imageMagick: true
});

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const image = await client.getImage(message).catch(error => {
    message.reply("you need to provide an image to make a \"not all disabilities are visible\" meme!");
    console.log(error);
  });
  const imageFile = tempy.file({extension: "png"});
  if (image !== undefined) {
    message.channel.startTyping();
    const template = "./assets/images/disabilities.png";
    const downloadImage = request.get(image).pipe(fs.createWriteStream(imageFile));
    downloadImage.on("finish", () => {
      gm(template).composite(downloadImage.path).gravity("Center").geometry("192x196+250+75").strip().stream((error, stdout) => {
        if (error) throw new Error(error);
        message.channel.stopTyping();
        message.channel.send({
          files: [{
            attachment: stdout,
            name: "disabled.png"
          }]
        });
      });
    });
  }
};

exports.aliases = ["disabilities"];
