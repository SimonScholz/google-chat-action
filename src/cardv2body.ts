import * as core from '@actions/core'
import { createCardV2Header } from './cardHeader'
import { createCardV2Section } from './cardSection'

export function createCardV2Body(): string {
  const card: Record<string, unknown> = {}
  const cardHeader: Record<string, string> = createCardV2Header()
  card.header = cardHeader

  const createSection = core.getBooleanInput('createSection')
  if (createSection) {
    card.sections = createCardV2Section()
  }

  const jsonBody = {
    cardsV2: [
      {
        card
      }
    ]
  }

  return JSON.stringify(jsonBody)
}
