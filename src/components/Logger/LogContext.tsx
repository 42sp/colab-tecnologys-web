import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

interface LogContextType {
  enabledTags: string[];
  toggleTag: (tag: string) => void;
  isTagEnabled: (tag: string) => boolean;
}

const LogContext = createContext<LogContextType | null>(null);

export const LogProvider = ({ children }: { children: ReactNode }) => {
  const [enabledTags, setEnabledTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setEnabledTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const isTagEnabled = (tag: string) => enabledTags.includes(tag) || enabledTags.includes("ALL");

  return (
    <LogContext.Provider value={{ enabledTags, toggleTag, isTagEnabled }}>
      {children}
    </LogContext.Provider>
  );
};

export const useLogContext = () => {
  const ctx = useContext(LogContext);
  if (!ctx) throw new Error("useLogContext must be used within a LogProvider");
  return ctx;
};
