const auditRequestContextPrompt = require("../db/data/context-prompt-data");
const openaiClient = require("../db/openai-client");

exports.getAiChatCompletionResponse = (userRequest) => {
  return openaiClient.chat.completions
    .create({
      messages: [
        { role: "assistant", content: auditRequestContextPrompt },
        {
          role: "assistant",
          content: `Hello! I’m your Clinical Audit Assistant. Let’s get started by gathering all the details for your audit.
\n1. What’s the name or objective of your audit?
•	Please provide a clear name for the audit.`,
        },
        { role: "user", content: userRequest },
      ],
      temperature: 1.0,
      top_p: 1.0,
      max_tokens: 1000,
      model: "gpt-4o",
      stop: [" User:", " Chatbot:"],
    })
    .then((aiResponse) => {
      return aiResponse.choices[0].message;
    });
};
