import * as core from '@actions/core'
import { createCardV2Header } from './cardHeader'
import { createCardV2Section } from './cardSection'

export function createCardV2Body(): Record<string, unknown> {
  const card: Record<string, unknown> = {}
  const cardHeader: Record<string, string> = createCardV2Header()
  card.header = cardHeader

  const createDefaultSection = core.getBooleanInput('createDefaultSection')
  if (createDefaultSection) {
    card.sections = createCardV2Section()
  } else {
    const additionalSections = core.getInput('additionalSections')
    card.sections = JSON.parse(additionalSections)
  }

  return {
    cardsV2: [
      {
        card
      }
    ]
  }
}
