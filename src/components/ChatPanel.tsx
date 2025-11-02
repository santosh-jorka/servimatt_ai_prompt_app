import { useChat } from "../context/ChatContext";
import InputBox from "./InputBox";
import ChatWindow from "./ChatWindow";

const ChatPanel: React.FC = () => {
  const { currentSession, submitPrompt,loading  } = useChat();

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
        <InputBox onSubmit={submitPrompt} loading={loading} />
      </footer>
    </main>
  );
};

export default ChatPanel;
