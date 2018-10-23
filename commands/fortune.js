const request = require("request");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  message.channel.startTyping();
  request({ uri: "http://www.yerkee.com/api/fortune", json: true }, (error, response, body) => {
    if (error) throw new Error(error);
    message.channel.stopTyping();
    message.channel.send(body.fortune);
  });
};

exports.aliases = ["fortunecookie", "cookie"];
