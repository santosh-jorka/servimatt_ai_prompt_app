interface ChatHistoryItemProps {
  id: string;
  title: string;
  isActive: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

const ChatHistoryItem: React.FC<ChatHistoryItemProps> = ({
  id,
  title,
  isActive,
  onSelect,
  onDelete,
}) => (
  <div
    className={`flex items-center justify-between px-4 py-2 cursor-pointer rounded-md group transition
      ${isActive ? "bg-gray-800 text-white" : "hover:bg-gray-800 text-gray-300"}`}
    onClick={() => onSelect(id)}
  >
    <span className="truncate text-sm">{title}</span>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onDelete(id);
      }}
      className="text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
    >
      ✕
    </button>
  </div>
);

export default ChatHistoryItem;
