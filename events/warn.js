module.exports = async (client, e) => {
  client.logger.log("warn", `A warn event was sent by Discord.js: \n${e}`);
};
