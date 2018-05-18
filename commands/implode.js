const request = require("request");
const gm = require("gm").subClass({
  imageMagick: true
});

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const image = client.getImage(message);
  message.channel.startTyping();
  gm(request(image)).implode([1]).strip().stream((error, stdout) => {
    if (error) throw new Error(error);
    message.channel.stopTyping();
    message.channel.send({
      files: [{
        attachment: stdout,
        name: "implode.png"
      }]
    });
  });
};
