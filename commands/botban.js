const fs = require("fs");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (message.author.id !== client.config.botOwner) return message.reply("only the bot owner can ban someone from using my commands!");
  if (args.length !== 0) {
    fs.readFile("./bannedusers.json", (error, data) => {
      if (error) throw new Error(error);
      const bannedUsers = JSON.parse(data);
      bannedUsers.push(args[0]);
      const bannedUsersJSON = JSON.stringify(bannedUsers);
      fs.writeFile("bannedusers.json", bannedUsersJSON, "UTF8", (error) => {
        if (error) throw new Error(error);
        message.reply(`The user ${client.users.fetch(args[0]).tag} has been banned from using my commands.`);
      });
    });
  } else {
    return message.reply("you need to provide the ID of the user you want to ban!");
  }
};

exports.aliases = [];
