import { useState } from "react";
import { useChat } from "../context/ChatContext";
import InputBox from "./InputBox";
import { type Prompt } from "./PromptBubble";
import ChatWindow from "./ChatWindow";

const ChatPanel: React.FC = () => {
  const { currentSession, addMessage } = useChat();
  const [loading, setLoading] = useState(false);

  // Dummy AI API simulation
  const simulateAIResponse = (text: string): Promise<string> =>
    new Promise((resolve) =>
      setTimeout(() => resolve(`🤖 Dummy AI response for: "${text}"`), 1000)
    );

  const handleSubmit = async (text: string) => {
    if (!currentSession || !text.trim()) return;

    const userMsg: Prompt = { id: Date.now().toString(), role: "user", content: text };
    addMessage(currentSession.id, userMsg);
    setLoading(true);

    const response = await simulateAIResponse(text);
    const aiMsg: Prompt = { id: (Date.now() + 1).toString(), role: "ai", content: response };
    addMessage(currentSession.id, aiMsg);

    setLoading(false);
  };

  // 🧠 If there are no chats at all
  if (!currentSession) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 text-lg">
        No chat yet. Click “+ New” to start chatting.
      </div>
    );
  }

  return (
    <main className="flex-1 flex flex-col bg-white/90 backdrop-blur-lg border-l border-gray-200">
      <header className="p-4 border-b border-gray-200 flex justify-center">
        <h1 className="text-2xl font-bold text-gray-800">{currentSession.title}</h1>
      </header>

      <section className="flex-1 overflow-y-auto">
        <ChatWindow prompts={currentSession.messages} loading={loading} />
      </section>

      <footer className="border-t border-gray-200">
        <InputBox onSubmit={handleSubmit} loading={loading} />
      </footer>
    </main>
  );
};

export default ChatPanel;
