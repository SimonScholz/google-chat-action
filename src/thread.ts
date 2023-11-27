export function createThreadBody(
  threadName?: string,
  threadKey?: string
): Record<string, string> {
  if (threadName) {
    return { name: threadName }
  }
  if (threadKey) {
    return {
      threadKey
    }
  }
  return {}
}
