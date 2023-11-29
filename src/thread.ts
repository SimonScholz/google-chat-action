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
  throw new Error('Either threadName or threadKey must be provided')
}
