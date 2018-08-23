const randomPuppy = require("random-puppy");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  message.channel.startTyping();
  const imageUrl = await randomPuppy("disneyvacation");
  message.channel.stopTyping();
  message.channel.send({
    files: [{
      attachment: imageUrl,
      name: "wikihow.png"
    }]
  });
};
