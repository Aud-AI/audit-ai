const express = require("express");
const cors = require("cors");

const { getAiChatResponse } = require("./controllers/ai-chat-controllers.js");

const app = express();

const corsOptions = {
  origin: ["http://127.0.0.1:5173"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.post("/ai-chat", getAiChatResponse);

module.exports = app;
