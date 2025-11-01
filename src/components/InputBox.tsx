import React, { useState, useRef, useEffect, type KeyboardEvent, type FormEvent } from "react";

interface InputBoxProps {
  onSubmit: (text: string) => void;
  loading?: boolean;
}

const InputBox: React.FC<InputBoxProps> = ({ onSubmit, loading = false }) => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-resize textarea height
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  }, [text]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey) return; // allow newline
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (text.trim() && !loading) {
        onSubmit(text.trim());
        setText("");
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim() && !loading) {
      onSubmit(text.trim());
      setText("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[70%] ml-[19%] flex items-end gap-2 p-3 border-t border-gray-200 bg-white"
    >
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your prompt... and click enter"
        disabled={loading}
        className="flex-1 resize-none overflow-hidden border border-gray-300 rounded-lg px-3 py-2 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-base
                   leading-relaxed transition-all max-h-48"
        style={{
          minHeight: "2.5rem",
          lineHeight: "1.5rem",
        }}
      />
      <button
        type="submit"
        disabled={loading}
        className={`flex items-center justify-center h-[40px] w-[48px] rounded-lg text-white font-medium transition-all duration-200
          ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 hover:shadow-[0_0_8px_rgba(59,130,246,0.5)]"
          }`}
        title="Send"
      >
        Submit
      </button>
    </form>
  );
};

export default InputBox;
