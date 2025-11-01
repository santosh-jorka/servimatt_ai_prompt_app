import Sidebar from "./components/Sidebar";
import ChatPanel from "./components/ChatPanel";
import { ChatProvider } from "./context/ChatContext.tsx";

const App: React.FC = () => {
  return (
    <ChatProvider>
      <div className="flex w-screen h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-blue-100 overflow-hidden">
        <Sidebar />
        <ChatPanel />
      </div>
    </ChatProvider>
  );
};

export default App;
