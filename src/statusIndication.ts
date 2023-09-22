export const statusColor = {
  success: '#31AF91',
  cancelled: '#EFCC00',
  failure: '#FF0B0B'
}

export const statusImage = {
  success:
    'https://raw.githubusercontent.com/SimonScholz/google-chat-action/main/assets/success-128.webp',
  cancelled:
    'https://raw.githubusercontent.com/SimonScholz/google-chat-action/main/assets/cancelled-128.webp',
  failure:
    'https://raw.githubusercontent.com/SimonScholz/google-chat-action/main/assets/failure-128.webp'
}

export const statusMessage = {
  success: 'Run was successful',
  cancelled: 'Run was cancelled',
  failure: 'Run failed'
}

export type StatusColorKey = keyof typeof statusColor
export type StatusImageKey = keyof typeof statusImage
export type StatusMessageKey = keyof typeof statusMessage
