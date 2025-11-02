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
  const containerRef = useRef<HTMLDivElement | null>(null);

 
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [prompts, currentAIText]);

  return (
    <div
      ref={containerRef}
      className="flex-1  bg-gray-50 
                 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
      style={{
        maxHeight: "calc(100vh - 170px)", 
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      {prompts.map((msg) =>
        msg.role === "user" ? (
          <div key={msg.id} className="w-full flex justify-end py-1">
            <PromptBubble prompt={msg} />
          </div>
        ) : (
          <div key={msg.id} className="w-full flex justify-start py-1">
            <AIResponseBubble text={msg.content} />
          </div>
        )
      )}

      {currentAIText && (
        <div className="w-full flex justify-start py-1">
          <AIResponseBubble text={currentAIText + " ▍"} />
        </div>
      )}

      {loading && !currentAIText && (
        <div className="text-center text-gray-400 italic animate-pulse mt-3">
          AI is thinking...
        </div>
      )}
      
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;
