import React from "react";

interface AIResponseBubbleProps {
  text: string;
}

const AIResponseBubble: React.FC<AIResponseBubbleProps> = ({ text }) => {
  return (
    <div className="w-full flex justify-start">
      <div
        className="ml-[12%] bg-gray-100 text-gray-900 rounded-2xl px-6 py-4 text-base leading-relaxed shadow-sm
                   whitespace-pre-wrap break-words w-[80%] text-left"
      >
        <span className="text-lg">{text}</span>
      </div>
    </div>
  );
};

export default AIResponseBubble;
