const request = require("request");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  message.channel.startTyping();
  request({ uri: "https://dog.ceo/api/breeds/image/random", json: true }, (error, response, body) => {
    if (error) throw new Error(error);
    message.channel.stopTyping();
    message.channel.send({
      files: [{
        attachment: body.message,
        name: "dog.png"
      }]
    });
  });
};

exports.aliases = ["doggos", "doggo", "pupper", "puppers", "dogs", "puppy", "puppies", "pups", "pup"];
