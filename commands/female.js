// const request = require("request-promise-native");
// const faceapp = require("faceapp");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  return message.reply("all face commands are currently disabled due to issues with the underlying API.");
  /*const image = await client.getImage(message).catch(error => {
    message.reply("you need to provide an image with a face to make it look female!");
    console.log(error);
  });
  if (image !== undefined) {
    message.channel.startTyping();
    const downloadedImage = await request({ uri: image, encoding: null });
    const faceImage = await faceapp.process(downloadedImage, "female").catch(error => {
      console.log(error);
      return message.reply("I couldn't find a face!");
    });
    message.channel.stopTyping();
    message.channel.send({
      files: [{
        attachment: faceImage,
        name: "female.png"
      }]
    }).catch((error) => {
      console.log("shut the heck up djs lol");
      console.log(error);
    });
  }*/
};

exports.aliases = [];
