const express = require("express");

const { getAiChatResponse } = require("./controllers/ai-chat-controllers.js");

const app = express();

app.use(express.json());

app.post("/ai-chat", getAiChatResponse);

module.exports = app;
