const { ChatOpenAI } = require("@langchain/openai");
const {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
  MemorySaver,
} = require("@langchain/langgraph");
const { v4: uuidv4 } = require("uuid");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const auditRequestContextPrompt = require("./data/context-prompt-data");

require("dotenv").config({
  path: `${__dirname}/../.env.openai`,
});

const openaiApiToken = process.env.OPENAI_API_TOKEN;
const endpoint = "https://models.inference.ai.azure.com";

// process.env.LANGSMITH_TRACING = true;
// process.env.LANGSMITH_ENDPOINT = "https://eu.api.smith.langchain.com";
// process.env.LANGSMITH_API_KEY = process.env.LANGSMITH_API_KEY;
// process.env.LANGSMITH_PROJECT = "audit-ai";

module.exports = new ChatOpenAI({
  apiKey: openaiApiToken,
  configuration: {
    baseURL: endpoint,
  },
  model: "gpt-4o",
  temperature: 0,
});

// const promptTemplate = ChatPromptTemplate.fromMessages([
//   ["system", auditRequestContextPrompt],
//   [
//     "system",
//     `Hello! I’m your Clinical Audit Assistant. Let’s get started by gathering all the details for your audit.
//   \n1. What’s the name or objective of your audit?
//   •	Please provide a clear name for the audit.`,
//   ],
//   ["placeholder", "{messages}"],
// ]);

// // Define the function that calls the model
// const callModel = async (state) => {
//   const prompt = await promptTemplate.invoke(state);
//   const response = await llm.invoke(prompt);
//   // Update message history with response:
//   return { messages: [response] };
// };

// // Define a new graph
// const workflow = new StateGraph(MessagesAnnotation)
//   // Define the node and edge
//   .addNode("model", callModel)
//   .addEdge(START, "model")
//   .addEdge("model", END);

// // Add memory and compile
// const app = workflow.compile({ checkpointer: new MemorySaver() });

// const config = { configurable: { thread_id: 1 } };

// const input = [
//   {
//     role: "user",
//     content: "Sepsis 6 compliance in Ward 10.",
//   },
// ];

// // const input2 = [
// //   {
// //     role: "user",
// //     content: "What's my name?",
// //   },
// // ];

// const testLlm = async () => {
//   const output1 = await app.invoke({ messages: input }, config);
//   console.log(output1.messages[output1.messages.length - 1]);

//   // const output2 = await app.invoke({ messages: input2 }, config);
//   // console.log(output2.messages[output2.messages.length - 1]);
// };

// testLlm();
