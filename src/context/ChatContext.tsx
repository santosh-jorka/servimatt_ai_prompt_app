import { createContext, useContext, useState, type ReactNode, useEffect } from "react";
import { type Prompt } from "../components/PromptBubble";
import { getAIResponse } from "../utils/aiService";


interface ChatSession {
  id: string;
  title: string;
  messages: Prompt[];
  createdAt: number;
}

interface ChatContextType {
  sessions: ChatSession[];
  currentId: string | null;
  currentSession: ChatSession | null;
  loading: boolean;
  error: string | null;
  newChat: () => void;
  selectChat: (id: string) => void;
  deleteChat: (id: string) => void;
  addMessage: (chatId: string, message: Prompt) => void;
  setMessages: (chatId: string, messages: Prompt[]) => void;
  clearChat: (chatId: string) => void;     // ✅ new function
  clearError: () => void;
  submitPrompt: (text: string) => Promise<void>; 
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (sessions.length > 0 && !currentId) {
      setCurrentId(sessions[0].id);
    }
  }, [sessions, currentId]);

  const newChat = () => {
    try {
      setLoading(true);
      const session: ChatSession = {
        id: Date.now().toString(),
        title: `Chat ${sessions.length + 1}`,
        messages: [],
        createdAt: Date.now(),
      };
      setSessions((prev) => [...prev, session]);
      setCurrentId(session.id);
    } catch {
      setError("Failed to create new chat session.");
    } finally {
      setLoading(false);
    }
  };

  const selectChat = (id: string) => {
    const found = sessions.find((s) => s.id === id);
    if (!found) {
      setError("Chat session not found.");
      return;
    }
    setCurrentId(id);
  };

  const deleteChat = (id: string) => {
    try {
      setLoading(true);
      const remaining = sessions.filter((s) => s.id !== id);
      if (remaining.length === sessions.length) {
        throw new Error("Chat not found.");
      }
      setSessions(remaining);
      if (currentId === id) setCurrentId(remaining[0]?.id || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete chat.");
    } finally {
      setLoading(false);
    }
  };

  const addMessage = (chatId: string, message: Prompt) => {
    try {
      const chatExists = sessions.some((s) => s.id === chatId);
      if (!chatExists) throw new Error("Cannot add message to nonexistent chat.");
      setSessions((prev) =>
        prev.map((s) =>
          s.id === chatId ? { ...s, messages: [...s.messages, message] } : s
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add message.");
    }
  };

  const setMessages = (chatId: string, messages: Prompt[]) => {
    try {
      const chatExists = sessions.some((s) => s.id === chatId);
      if (!chatExists) throw new Error("Chat not found for updating messages.");
      setSessions((prev) =>
        prev.map((s) => (s.id === chatId ? { ...s, messages } : s))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to set messages.");
    }
  };

  const clearChat = (chatId: string) => {
    try {
      setLoading(true);
      const chatExists = sessions.some((s) => s.id === chatId);
      if (!chatExists) throw new Error("Chat not found to clear.");
      setSessions((prev) =>
        prev.map((s) => (s.id === chatId ? { ...s, messages: [] } : s))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to clear chat.");
    } finally {
      setLoading(false);
    }
  };

 const submitPrompt = async (text: string) => {
  if (!currentId) return;

  const userMsg: Prompt = {
    id: Date.now().toString(),
    role: "user",
    content: text,
  };

  addMessage(currentId, userMsg);
  setLoading(true);
  setError(null);

  try {
    const numChunks = Math.floor(Math.random() * 3) + 3;

    for (let i = 1; i <= numChunks; i++) {
      const ai = await getAIResponse(text, i, 1);

      const aiMsg: Prompt = {
        id: `${Date.now()}-${i}`,
        role: "ai",
        content: ai.text,
      };

      setSessions((prev) =>
        prev.map((s) =>
          s.id === currentId
            ? { ...s, messages: [...s.messages, aiMsg] }
            : s
        )
      );

      await new Promise((r) => setTimeout(r, 1000));
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to fetch AI response.");
  } finally {
    setLoading(false);
  }
};



  const clearError = () => setError(null);

  const currentSession = sessions.find((s) => s.id === currentId) || null;

  return (
    <ChatContext.Provider
      value={{
        sessions,
        currentId,
        currentSession,
        loading,
        error,
        newChat,
        selectChat,
        deleteChat,
        addMessage,
        setMessages,
        clearChat,   
        clearError,
        submitPrompt,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within a ChatProvider");
  return context;
};
