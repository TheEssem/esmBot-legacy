const request = require("request").defaults({ encoding: null });

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const image = await client.getImage(message).catch(error => {
    message.reply("you need to provide an image to generate a meme!");
    console.log(error);
  });
  if (args.length !== 0) {
    const [topText, bottomText] = args.join(" ").split(",").map(elem => elem.trim());
    if (image !== undefined) {
      message.channel.startTyping();
      if (bottomText !== undefined) {
        const memeOutput = request(`https://memegen.link/custom/${topText ? encodeURIComponent(topText.split(" ").join("_")) : "_"}/${encodeURIComponent(bottomText.split(" ").join("_"))}.jpg?alt=${encodeURIComponent(image)}&font=impact&watermark=none`);
        message.channel.stopTyping();
        message.channel.send({
          files: [{
            attachment: memeOutput,
            name: "meme.png"
          }]
        });
      } else {
        const memeOutput = request(`https://memegen.link/custom/${encodeURIComponent(topText.split(" ").join("_"))}.jpg?alt=${encodeURIComponent(image)}&font=impact&watermark=none`);
        message.channel.stopTyping();
        message.channel.send({
          files: [{
            attachment: memeOutput,
            name: "meme.png"
          }]
        });
      }
    }
  } else {
    message.reply("you need to provide some text to generate a meme!");
  }
};

exports.aliases = ["impact"];
