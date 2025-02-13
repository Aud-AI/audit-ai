const auditRequestContextPrompt = require("../db/data/context-prompt-data");
const openaiClient = require("../db/openai-client");

const {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
  MemorySaver,
} = require("@langchain/langgraph");
const { v4: uuidv4 } = require("uuid");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const llm = require("../db/langchain-client");

const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", auditRequestContextPrompt],
  [
    "system",
    `Hello! I’m your Clinical Audit Assistant. Let’s get started by gathering all the details for your audit.
  \n1. What’s the name or objective of your audit?
  •	Please provide a clear name for the audit.`,
  ],
  ["placeholder", "{messages}"],
]);

// Define the function that calls the model
const callModel = async (state) => {
  const prompt = await promptTemplate.invoke(state);
  const response = await llm.invoke(prompt);
  // Update message history with response:
  return { messages: [response] };
};

// Define a new graph
const workflow = new StateGraph(MessagesAnnotation)
  // Define the node and edge
  .addNode("model", callModel)
  .addEdge(START, "model")
  .addEdge("model", END);

// Add memory and compile
const memory = new MemorySaver();
const app = workflow.compile({ checkpointer: memory });

const config = { configurable: { thread_id: "1" } };

exports.getAiChatCompletionResponse = (userRequest) => {
  //   return openaiClient.chat.completions
  //     .create({
  //       messages: [
  //         { role: "assistant", content: auditRequestContextPrompt },
  //         {
  //           role: "assistant",
  //           content: `Hello! I’m your Clinical Audit Assistant. Let’s get started by gathering all the details for your audit.
  // \n1. What’s the name or objective of your audit?
  // •	Please provide a clear name for the audit.`,
  //         },
  //         { role: "user", content: userRequest },
  //       ],
  //       temperature: 1.0,
  //       top_p: 1.0,
  //       max_tokens: 1000,
  //       model: "gpt-4o",
  //       stop: [" User:", " Chatbot:"],
  //     })
  //     .then((aiResponse) => {
  //       return aiResponse.choices[0].message;
  //     });

  return app
    .invoke(
      {
        messages: [
          {
            role: "user",
            content: userRequest,
          },
        ],
      },
      config
    )
    .then((output) => {
      return output.messages[output.messages.length - 1].content;
    });
};
