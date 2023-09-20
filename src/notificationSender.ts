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

  const responseBody = await response.json()
  console.log(`Google Chat response: ${JSON.stringify(responseBody)}`)

  if (!response.ok) {
    throw new Error(
      `Google Chat notification failed! message=${responseBody.error.message} status=${responseBody.error.status} code=${responseBody.error.code}`
    )
  }
}
