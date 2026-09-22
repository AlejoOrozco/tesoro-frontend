function formatUnknown(value: unknown): string {
  if (typeof value === "string") return value;
  if (value instanceof Error) return value.message;
  return "Unknown error";
}

export const logger = {
  info(message: string): void {
    console.info(message);
  },
  error(message: string, cause?: unknown): void {
    if (cause === undefined) {
      console.error(message);
      return;
    }
    console.error(`${message}: ${formatUnknown(cause)}`);
  },
};
