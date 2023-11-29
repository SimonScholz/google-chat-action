import * as core from '@actions/core'
import { createCardV2Body } from './cardv2body'
import { createThreadBody } from './thread'
import { notifyGoogleChat } from './notificationSender'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    let webhookUrl = core.getInput('webhookUrl', { required: true })
    const messageBody = createCardV2Body()
    const threadName = core.getInput('threadName')
    const threadKey = core.getInput('threadKey')
    if (threadName || threadKey) {
      webhookUrl = `${webhookUrl}&messageReplyOption=REPLY_MESSAGE_FALLBACK_TO_NEW_THREAD`
      messageBody.thread = createThreadBody(threadName, threadKey)
    }

    const messageBodyString = JSON.stringify(messageBody)
    const responseBody = await notifyGoogleChat(webhookUrl, messageBodyString)
    core.setOutput('threadName', responseBody.thread.name)
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
