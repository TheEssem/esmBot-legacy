const tempy = require("tempy");
const wrap = require("word-wrap");
const gm = require("@tohru/gm").subClass({
  imageMagick: true
});

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (args.length === 0) return message.reply("you need to provide some text to make a Sonic meme!");
  const text = tempy.file({extension: "png"});
  message.channel.startTyping();
  const template = "./assets/images/sonictemplate.jpg";
  const cleanedMessage = args.join(" ").replace(/&/g, "\\&amp;").replace(/>/g, "\\&gt;").replace(/</g, "\\&lt;");
  gm(474, 332).out("+size").gravity("Center").out("-pointsize", 40).out("-font", "Bitstream Vera Sans").out(`pango:${wrap(cleanedMessage, {width: 15, indent: ""})}`).negative().out("-fuzz", "30%").transparent("black").write(text, (error) => {
    if (error) throw new Error(error);
    gm(template).composite(text).gravity("Center").geometry("474x332+160+10").stream((error, stdoutFinal) => {
      if (error) throw new Error(error);
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: stdoutFinal,
          name: "sonic.png"
        }]
      });
    });
  });
};

exports.aliases = [];
