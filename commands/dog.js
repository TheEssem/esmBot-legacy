const request = require("request");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  request({ uri: "https://random.dog/woof.json?filter=mp4,webm", json: true }, (error, response, body) => {
    if (error) throw new Error(error);
    message.channel.send({
      files: [{
        attachment: body.url,
        name: "cat.png"
      }]
    });
  });
};
