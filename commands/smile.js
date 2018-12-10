const request = require("request-promise-native");
const faceapp = require("faceapp");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const image = await client.getImage(message).catch(error => {
    message.reply("you need to provide an image with a face to add a smile!");
    console.log(error);
  });
  if (image !== undefined) {
    message.channel.startTyping();
    const downloadedImage = await request({ uri: image, encoding: null });
    const faceImage = await faceapp.process(downloadedImage, "smile_3").catch(error => {
      console.log(error);
      return message.reply("I couldn't find a face!");
    });
    message.channel.stopTyping();
    message.channel.send({
      files: [{
        attachment: faceImage,
        name: "smile.png"
      }]
    }).catch((error) => {
      console.log("shut the heck up djs lol");
      console.log(error);
    });
  }
};

exports.aliases = [];
