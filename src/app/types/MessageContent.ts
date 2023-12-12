const MessageThemes = {
  SUCCESS: {
    title: "SUCCESS",
    severity: "success",
  },
  INFO: {
    title: "INFO",
    severity: "info",
  },
  WARNING: {
    title: "WARNING",
    severity: "warning",
  },
  ERROR: {
    title: "ERROR",
    severity: "error",
  },
};

export type MessageThemes = keyof typeof MessageThemes;

export interface MessageContent {
  theme: MessageThemes;
  message: string;
}
