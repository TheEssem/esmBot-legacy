const request = require("request");
const parser = require("xml2js");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  request(`http://thecatapi.com/api/images/get?format=xml&api_key=${client.config.catToken}`, (error, response, body) => {
    if (error) throw new Error(error);
    parser.parseString(body, (error, result) => {
      if (error) throw new Error(error);
      message.channel.send(`<${result.response.data[0].images[0].image[0].source_url[0]}>`, {
        files: [{
          attachment: result.response.data[0].images[0].image[0].url[0],
          name: "cat.png"
        }]
      });
    });
  });
};
