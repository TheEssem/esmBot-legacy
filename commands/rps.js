exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  var emoji = "";
  var winOrLose = 0;
  if (args.length === 0) {
    return message.reply("you need to choose whether you want to be rock, paper, or scissors!");
  } else if (args[0] !== "rock" && args[0] !== "paper" && args[0] !== "scissors") {
    return message.reply("you need to choose whether you want to be rock, paper, or scissors!");
  } else {
    const result = ["rock", "paper", "scissors"].random();
    if (result === "rock") {
      emoji = "✊";
      if (args[0].toLowerCase() === "paper") {
        winOrLose = 1;
      }
    }
    if (result === "paper") {
      emoji = "✋";
      if (args[0].toLowerCase() === "scissors") {
        winOrLose = 1;
      }
    }
    if (result === "scissors") {
      emoji = "✌";
      if (args[0].toLowerCase() === "rock") {
        winOrLose = 1;
      }
    }
    if (args[0].toLowerCase() !== result) {
      message.channel.send(`${emoji} I chose ${result}. ${winOrLose ? "You win!" : "You lose!"}`);
    } else {
      message.channel.send(`${emoji} I chose ${result}. It's a tie!`);
    }
  }
};

exports.aliases = ["rockpaperscissors"];
