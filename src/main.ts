import * as core from '@actions/core'
import { createCardV2Body } from './cardv2body'
import { notifyGoogleChat } from './notificationSender'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const webhookUrl = core.getInput('webhookUrl', { required: true })
    const cardV2Body = createCardV2Body()
    console.log(cardV2Body)
    await notifyGoogleChat(webhookUrl, cardV2Body)
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    } else if (typeof error === 'string') {
      core.setFailed(error)
    } else {
      core.setFailed('unexpected error')
    }
  }
}
 