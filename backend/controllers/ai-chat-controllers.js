const {
  getAiChatCompletionResponse,
} = require("../models/ai-chat-completions-models");

exports.getAiChatResponse = (request, response, next) => {
  const { userRequest } = request.body;

  getAiChatCompletionResponse(userRequest)
    .then((aiResponse) => {
      response.status(201).send({ aiResponse });
    })
    .catch(next);
};
