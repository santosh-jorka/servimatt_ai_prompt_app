import { useEffect, useRef } from "react";
import PromptBubble, { type Prompt } from "./PromptBubble";
import AIResponseBubble from "./AIResponseBubble";

interface ChatWindowProps {
  prompts?: Prompt[];
  currentAIText?: string;
  loading?: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  prompts = [],
  currentAIText = "",
  loading = false,
}) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [prompts, currentAIText]);

  return (
    <div
      className="flex-1 overflow-y-auto bg-gray-50 px-[10%] py-6 space-y-4
                 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent flex flex-col"
    >
      {/* Render all messages */}
      {prompts.map((msg) =>
        msg.role === "user" ? (
          <div key={msg.id} className="w-full flex justify-end">
            <PromptBubble prompt={msg} />
          </div>
        ) : (
          <AIResponseBubble key={msg.id} text={msg.content} />
        )
      )}

      {/* Streaming AI message (centered) */}
      {currentAIText && (
        <div className="w-full flex justify-center">
          <div
            className="bg-gray-200 text-gray-800 rounded-2xl px-5 py-3 text-lg leading-relaxed shadow
                       whitespace-pre-wrap text-center max-w-[65%]"
          >
            {currentAIText}
            <span className="animate-pulse">▍</span>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {loading && !currentAIText && (
        <div className="text-center text-gray-400 text-sm italic animate-pulse">
          AI is thinking...
        </div>
      )}

      {/* Scroll anchor */}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;
