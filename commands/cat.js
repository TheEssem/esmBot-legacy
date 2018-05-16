const request = require("request");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  request({ uri: "http://aws.random.cat/meow", json: true }, (error, response, body) => {
    if (error) throw new Error(error);
    message.channel.send({
      files: [{
        attachment: body.file,
        name: "cat.png"
      }]
    });
  });
};
