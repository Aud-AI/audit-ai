import React, { useEffect, useState } from "react";
import { postUserChat } from "../api";

export default function AuditPage() {
  type Chat = {
    message: string;
    style: string;
  };
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [chatInput, setChatInput] = useState("");

  const handleChatInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value);
  };
  const handleChatInputSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setChatHistory((currChatHistory) => {
      return [
        ...currChatHistory,
        {
          message: chatInput,
          style:
            "rounded-md bg-white self-end px-3 py-1.5 text-base text-black placeholder:text-gray-400 sm:text-sm/6 outline-none",
        },
      ];
    });
    postUserChat({ userRequest: chatInput }).then(({ data }) => {
      setChatHistory((currChatHistory) => {
        return [
          ...currChatHistory,
          {
            message: data.aiResponse,
            style:
              "rounded-md bg-zinc-800 self-start px-3 py-1.5 text-base text-gray-200 placeholder:text-gray-400 sm:text-sm/6 outline-none",
          },
        ];
      });
      console.log(data.aiResponse);
    });
    setChatInput("");
  };
  useEffect(() => {
    const scrollContainer = document.getElementById(
      "scroll-container"
    ) as HTMLElement;

    // Function to scroll the chat box to the bottom
    const scrollToBottom = (scrollContainer: HTMLElement) => {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    };
    scrollToBottom(scrollContainer);
  }, [chatHistory]);

  return (
    <div className="w-screen h-screen flex flex-col">
      <div
        className="flex flex-col items-center mb-17 px-20 py-10 gap-x-6 gap-y-8 overflow-auto scroll-smooth"
        id="scroll-container"
      >
        <p className="rounded-md bg-zinc-800 self-start px-3 py-1.5 text-base text-gray-200 placeholder:text-gray-400 sm:text-sm/6 outline-none">
          {" "}
          Hello! I’m your Clinical Audit Assistant. Let’s get started by
          gathering all the details for your audit.
          <br></br>
          1. What’s the name or objective of your audit?
        </p>
        {chatHistory.map((chat) => (
          <p className={chat.style}>{chat.message}</p>
        ))}
      </div>
      <div className="fixed inset-x-0 bottom-0 bg-gray-200">
        <form
          onSubmit={handleChatInputSubmit}
          className="max-w-screen-lg m-auto w-full p-4 flex space-x-4 justify-center items-center"
        >
          <input
            id="about"
            name="about"
            className="block w-3/4 rounded-lg bg-zinc-800 px-3 py-1.5 text-base text-gray-200 placeholder:text-gray-400 sm:text-sm/6 outline-none"
            value={chatInput}
            onChange={handleChatInputChange}
            placeholder="Chat with Audit AI"
          />
          {/* <div className="relative w-3/4 flex items-center justify-end">
          <button
            type="submit"
            className="rounded-md bg-[--maroon] px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--maroon] active:bg-red-600"
          >
            Submit
          </button>
        </div> */}
        </form>
      </div>
    </div>
  );
}
