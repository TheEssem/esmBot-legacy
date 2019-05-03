const request = require("request-promise-native").defaults({ encoding: null });
const sharp = require("sharp");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const image = await client.getImage(message).catch(error => {
    message.reply("you need to provide an image to flop!");
    console.log(error);
  });
  if (image !== undefined) {
    message.channel.startTyping();
    const imageData = await request(image);
    sharp(imageData).flop().toBuffer().then((data) => {
      message.channel.stopTyping();
      return message.channel.send({
        files: [{
          attachment: data,
          name: "flop.png"
        }]
      });
    }).catch(error => { throw new Error(error); });
  }
};

exports.aliases = ["flip2"];
