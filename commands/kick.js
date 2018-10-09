exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("you need to have the `Kick Members` permission on this server to kick people!");
  if (!message.guild.me.permissions.has("KICK_MEMBERS") && !message.channel.permissionsFor(message.guild.me).has("KICK_MEMBERS")) return message.reply("I don't have the `Kick Members` permission!");
  const user = message.mentions.users.first();
  if (user) {
    const member = message.guild.member(user);
    if (member) {
      member.kick().then(() => {
        return message.channel.send(`Successfully kicked ${user.tag}.`);
      }).catch(error => {
        message.reply("I was unable to kick the member. Have you given me permissions?");
        console.error(error);
      });
    } else {
      message.reply("that user isn't in this server!");
    }
  } else {
    message.reply("you need to provide a user to kick!");
  }
};
