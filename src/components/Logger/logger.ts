import { useLogContext } from "./LogContext";

const LOG_PREFIX = "[APP_MONITOR]";

export const createLogger = (enabledTags: string[]) => {
  const isTagAllowed = (tag: string) => enabledTags.includes("ALL") || enabledTags.includes(tag);

  return {
    info: (tag: string, message: string, data?: any) => {
      if (!isTagAllowed(tag)) return;
      console.log(`%c${LOG_PREFIX}%c [INFO] ${tag}: ${message}`, "color: green; font-weight: bold;", "color: unset;", data || "");
    },
    warn: (tag: string, message: string, data?: any) => {
      if (!isTagAllowed(tag)) return;
      console.warn(`%c${LOG_PREFIX}%c [WARN] ${tag}: ${message}`, "color: orange; font-weight: bold;", "color: unset;", data || "");
    },
    error: (tag: string, message: string, error?: any) => {
      if (!isTagAllowed(tag)) return;
      console.error(`%c${LOG_PREFIX}%c [ERROR] ${tag}: ${message}`, "color: red; font-weight: bold;", "color: unset;", error || "");
    },
  };
};
