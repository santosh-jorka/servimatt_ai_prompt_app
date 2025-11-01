import React from "react";

export interface Prompt {
  id: string;
  role: "user" | "ai";
  content: string;
}

interface PromptBubbleProps {
  prompt: Prompt;
}

const PromptBubble: React.FC<PromptBubbleProps> = ({ prompt }) => {
  const isUser = prompt.role === "user";

  return (
    <div
      className={`flex w-full my-2 ${
        isUser ? "justify-end" : "justify-center"
      }`}
    >
      <div
        className={`inline-block rounded-2xl px-4 py-2 text-lg shadow leading-relaxed
          ${isUser ? "bg-blue-600 text-white" : "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"}
          w-auto max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%]
          whitespace-normal break-words`}
      >
        {prompt.content}
      </div>
    </div>
  );
};

export default PromptBubble;
