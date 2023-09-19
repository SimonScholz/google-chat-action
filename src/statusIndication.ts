export const statusColor = {
  success: '#96BB7C',
  cancelled: '#FFD271',
  failure: '#D54062'
}

export const statusImage = {
  success:
    'https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Checkmark-128.png',
  cancelled:
    'https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_48-128.png',
  failure:
    'https://cdn2.iconfinder.com/data/icons/kids/128x128/apps/agt_action_fail.png'
}

export type StatusColorKey = keyof typeof statusColor
export type StatusImageKey = keyof typeof statusImage
