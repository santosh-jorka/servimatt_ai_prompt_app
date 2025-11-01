import { useChat } from "../context/ChatContext";
import ChatHistoryItem from "./ChatHistoryComponent";

const Sidebar: React.FC = () => {
  const { sessions, currentId, newChat, deleteChat, selectChat } = useChat();

  return (
    <aside className="w-64 bg-gray-900 text-gray-100 flex flex-col border-r border-gray-800">
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <h2 className="text-lg font-semibold">History</h2>
        <button
          onClick={newChat}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
        >
          + New
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {sessions.length === 0 ? (
          <p className="text-gray-400 text-center mt-6 text-sm">No chats yet</p>
        ) : (
          sessions.map((s) => (
            <ChatHistoryItem
              key={s.id}
              id={s.id}
              title={s.title}
              isActive={currentId === s.id}
              onSelect={selectChat}
              onDelete={deleteChat}
            />
          ))
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
