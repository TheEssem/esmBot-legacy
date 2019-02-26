module.exports = async (client, e) => {
  client.logger.log(`A warn event was sent by Discord.js: \n${e}`, "warn");
};
