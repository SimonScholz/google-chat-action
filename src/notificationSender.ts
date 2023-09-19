export async function notifyGoogleChat(
  url: string,
  body: string
): Promise<void> {
  const response = await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
  if (response.status < 200 && response.status > 299) {
    throw new Error(
      `Google Chat notification failed! error-response=${response.body} status=${response.status}`
    )
  }
}
