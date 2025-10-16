import { useLogContext } from "./LogContext";

export const useLogger = () => {
  const { isTagEnabled } = useLogContext();

  const LOG_PREFIX = "[APP_MONITOR]";

  return {
    info: (tag: string, message: string, data?: any) => {
      if (!isTagEnabled(tag)) return;
      console.log(
        `%c${LOG_PREFIX}%c [INFO] ${tag}: ${message}`,
        "color: green; font-weight: bold;",
        "color: unset;",
        data || ""
      );
    },

    warn: (tag: string, message: string, data?: any) => {
      if (!isTagEnabled(tag)) return;
      console.warn(
        `%c${LOG_PREFIX}%c [WARN] ${tag}: ${message}`,
        "color: orange; font-weight: bold;",
        "color: unset;",
        data || ""
      );
    },

    error: (tag: string, message: string, error?: any) => {
      if (!isTagEnabled(tag)) return;
      console.error(
        `%c${LOG_PREFIX}%c [ERROR] ${tag}: ${message}`,
        "color: red; font-weight: bold;",
        "color: unset;",
        error || ""
      );
    },
  };
};
