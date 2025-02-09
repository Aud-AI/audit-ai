const { OpenAI } = require("openai");

require("dotenv").config({
  path: `${__dirname}/../.env.openai`,
});

const token = process.env.OPENAI_API_TOKEN;
const endpoint = "https://models.inference.ai.azure.com";

module.exports = new OpenAI({ baseURL: endpoint, apiKey: token });
