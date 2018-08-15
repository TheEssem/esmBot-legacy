exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply("you need to have the `Ban Members` permission on this server to kick people!");
  const user = message.mentions.users.first();
  if (user) {
    const member = message.guild.member(user);
    if (member) {
      member.ban().then(() => {
        return message.channel.send(`Successfully banned ${user.tag}.`);
      }).catch(error => {
        message.reply("I was unable to ban the member. Have you given me permissions?");
        console.error(error);
      });
    } else {
      message.reply("that user isn't in this server!");
    }
  } else {
    message.reply("you need to provide a user to ban!");
  }
};
