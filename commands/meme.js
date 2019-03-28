const request = require("request-promise-native").defaults({ encoding: null });
const spawn = require("child_process").spawn;

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const image = await client.getImage(message).catch(error => {
    message.reply("you need to provide an image to generate a meme!");
    console.log(error);
  });
  if (args.length !== 0) {
    if (image !== undefined) {
      message.channel.startTyping();
      const [topText, bottomText] = args.join(" ").split(",").map(elem => elem.trim());
      const child = spawn("./meme.sh", [topText.toUpperCase().replace(/\\/g, "\\\\"), bottomText ? bottomText.toUpperCase().replace(/\\/g, "\\\\") : ""]);
      request(image).then((imageData) => {
        child.stdin.write(imageData);
        return child.stdin.end();
      }).catch(error => { throw new Error(error); });
      const chunks = [];
      child.stdout.on("data", (data) => {
        chunks.push(data);
      });
      child.on("error", (error) => {
        throw new Error(error);
      });
      child.stderr.on("data", (error) => {
        throw new Error(error);
      });
      child.stdout.on("close", () => {
        const data = Buffer.concat(chunks);
        message.channel.stopTyping();
        message.channel.send({
          files: [{
            attachment: data,
            name: "meme.png"
          }]
        });
      });
    }
  } else {
    message.reply("you need to provide some text to generate a meme!");
  }
};

exports.aliases = ["impact"];
