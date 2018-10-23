const request = require("request").defaults({ encoding: null });

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (args.length > 0) {
    message.channel.startTyping();
    const memeOutput = request(`https://www.minecraftskinstealer.com/achievement/a.php?i=13&h=Achievement+get%21&t=${args.join("+")}`);
    message.channel.stopTyping();
    message.channel.send({
      files: [{
        attachment: memeOutput,
        name: "mc.png"
      }]
    });
  } else {
    message.reply("you need to provide some text to generate a Minecraft achievement!");
  }
};

exports.aliases = ["ach", "achievement", "minecraft"];
